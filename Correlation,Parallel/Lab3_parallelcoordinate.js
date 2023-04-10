var margin = { top: 30, right: 130, bottom: 1, left: 115 },
    width4 = 500,
    height4 = 500;

var svg4 = d3.select("#Parallel_coordinates")
    .append("svg")
    .attr("width", width4 + margin.left + margin.right)
    .attr("height", height4 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

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
    for (var j = 1; j < 9; j++) {
        for (var k = 1; k < 9; k++) {
            if (j < k) {
                var list1 = [];
                var list2 = [];
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i]
                    list1.push(+obj[Object.keys(obj)[k]])
                    list2.push(+obj[Object.keys(obj)[j]])
                }
                dic = { x_val: Object.keys(obj)[k], y_val: Object.keys(obj)[j], value: getCorrelation(list1, list2), xindex: k, yindex: j }
                total.push(dic)
            }
        }
    }
    largest_sum = total.sort(function (a, b) {
        return Math.abs(b.value) - Math.abs(a.value)
    })

    var list_sequence = []
    list_sequence.push(total[0])

    var x_list = []
    x_list.push(total[0].xindex)
    var dimensions = []
    dimensions.push(total[0].x_val)
    dimensions.push(total[0].y_val)
    var w = 0

    while (list_sequence.length < 7) {
        var total = []
        var k = list_sequence[w].yindex
        for (var j = 1; j < 9; j++) {
            if (k != j && !(x_list.includes(j))) {
                var list1 = [];
                var list2 = [];
                for (var i = 0; i < data.length; i++) {
                    var obj = data[i]
                    list1.push(+obj[Object.keys(obj)[k]])
                    list2.push(+obj[Object.keys(obj)[j]])
                }
                dic = { x_val: Object.keys(obj)[k], y_val: Object.keys(obj)[j], value: getCorrelation(list1, list2), xindex: k, yindex: j }
                total.push(dic)
            }
        }
        largest_sum = total.sort(function (a, b) {
            return Math.abs(b.value) - Math.abs(a.value)
        })
        x_list.push(total[0].xindex)
        list_sequence.push(total[0])
        dimensions.push(total[0].y_val)
        w++
    }
    console.log(list_sequence)
    console.log(dimensions)
    var y = {}
    for (i in dimensions) {
        var name = dimensions[i]
        y[name] = d3.scaleLinear()
            .domain(d3.extent(data, function (d) { return +d[name]; }))
            .range([height4, 0])
    }

    x = d3.scalePoint()
        .range([0, width4])
        .domain(dimensions);

    function path(d) {
        return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
    }

    svg4.selectAll("Path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "#69b3a2")
        .style("opacity", 0.5)

    svg4.selectAll("myAxis")
        .data(dimensions).enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + x(d) + ")"; })
        .each(function (d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
        .append("text")
        .style("text-anchor", "middle")
        .attr("y", -9)
        .text(function (d) { return d; })
        .style("fill", "black")

})






