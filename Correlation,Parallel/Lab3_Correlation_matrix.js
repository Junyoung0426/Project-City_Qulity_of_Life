var margin = { top: 30, right: 130, bottom: 30, left: 115 },
    width = 600,
    height = 600;

var svg = d3.select("#Correlation_Matrix")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var x_name = ["Housing", "Cost of Living", "Commute", "Safety", "Business Freedom", "Education", "Environmental Quality", "Economy"]
var y_name = ["Housing", "Cost of Living", "Commute", "Safety", "Business Freedom", "Education", "Environmental Quality", "Economy"]

var x = d3.scaleBand()
    .range([0, width])
    .domain(x_name);

svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

var y = d3.scaleBand()
    .range([height, 0])
    .domain(y_name)
    ;
svg.append("g")
    .call(d3.axisLeft(y));

var color_range = d3.scaleLinear()
    .range(["blue", "white", "red"])
    .domain([-1, 0, 1])

function getCorrelation(X, Y) {
    let sum_X = 0, sum_Y = 0, sum_XY = 0;
    let squareSum_X = 0, squareSum_Y = 0;
    n = X.length
    for (let i = 0; i < n; i++) {
        sum_X = sum_X + X[i];
        sum_Y = sum_Y + Y[i];
        sum_XY = sum_XY + X[i] * Y[i];
        squareSum_X = squareSum_X + X[i] * X[i];
        squareSum_Y = squareSum_Y + Y[i] * Y[i];
    }
    let corr = (sum_XY / n - sum_X / n * sum_Y / n) /
        (Math.sqrt((squareSum_X / n - sum_X / n * sum_X / n)
            * (squareSum_Y / n - sum_Y / n * sum_Y / n)));
    return corr;
}

d3.csv("Qualityoflife.csv", function (data) {
    var total = []
    for (var j = 8; j >= 1; j--) {
        for (var k = 1; k < 9; k++) {
            var list1 = [];
            var list2 = [];
            for (var i = 0; i < data.length; i++) {
                var obj = data[i]
                list1.push(+obj[Object.keys(obj)[k]])
                list2.push(+obj[Object.keys(obj)[j]])
            }
            dic = { x_val: Object.keys(obj)[k], y_val: Object.keys(obj)[j], value: getCorrelation(list1, list2) }
            total.push(dic)
            console.log(dic)
        }
    }
    console.log(total)

    svg.selectAll(".cor")
        .data(total, function (d) { return d.x_val + ':' + d.y_val; })
        .enter()
        .append('rect')
        .attr("x", function (d) { return x(d.x_val) })
        .attr("y", function (d) { return y(d.y_val) })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return color_range(d.value) })

})

var margin = { top: 100, right: 810, bottom: 100, left: 752 };
height_legend = 350,
    width_lengend = 1580
var svg2 = d3.select("#legend")
    .append("svg")
    .attr("height", (height_legend) + "px")
    .attr("width", (width_lengend) + "px")
    .style("position", "absolute")
    .style("left", "0px")
    .style("top", "0px")

var canvas = d3.select("#legend")
    .style("height", height_legend + "px")
    .style("width", width_lengend + "px")
    .style("position", "relative")
    .append("canvas")
    .attr("height", height_legend - margin.top - margin.bottom)
    .attr("width", 1)
    .style("height", (height_legend - margin.top - margin.bottom) + "px")
    .style("width", (width_lengend - margin.left - margin.right) + "px")
    .style("position", "absolute")
    .style("top", (margin.top) + "px")
    .style("left", (margin.left) + "px")
    .node();

var canva_ctx = canvas.getContext("2d");

var legendscale = d3.scaleLinear()
    .range([height_legend - margin.top - margin.bottom, 1])
    .domain([-1, 1]);

d3.range(height_legend).forEach(function (i) {
    canva_ctx.fillStyle = color_range(legendscale.invert(i));
    canva_ctx.fillRect(0, i, 1, 1);
});

var legend_range = d3.axisRight()
    .scale(legendscale)
    .ticks(3);

svg2
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + (width_lengend - margin.left - margin.right + 755) + "," + (margin.top) + ")")
    .call(legend_range)
    ;
