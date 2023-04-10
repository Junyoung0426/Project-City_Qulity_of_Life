var marginWhole = { top: 10, right: 10, bottom: 10, left: 10 },
    sizeWhole = 640 - marginWhole.left - marginWhole.right

var svg = d3.select("#Correlation_Scattor")
    .append("svg")
    .attr("width", sizeWhole + marginWhole.left + marginWhole.right + 100)
    .attr("height", sizeWhole + marginWhole.top + marginWhole.bottom + 100)
    .append("g")
    .attr("transform", "translate(" + marginWhole.left + "," + marginWhole.top + ")");

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
    var list = []

    for (var k = 1; k < 10; k++) {

        var sum_corr_Data = 0;
        for (var j = 1; j < 10; j++) {
            var list1 = []
            var list2 = []
            for (var i = 0; i < data.length; i++) {
                var obj = data[i]
                list1.push(+obj[Object.keys(obj)[k]])
                list2.push(+obj[Object.keys(obj)[j]])
            }
            sum_corr_Data += Math.abs(+getCorrelation(list1, list2))
        }
        list.push(dict = { name: Object.keys(obj)[k], sum: sum_corr_Data })
    }
    largest_sum = list.sort(function (a, b) {
        return b.sum - a.sum
    })
    console.log(list)
    list.pop(), list.pop(), list.pop(), list.pop()
    console.log(list)

    let allVar = list.map(a => a.name);
    let all_Sum_Corr = list.map(a => a.sum);
    var x_count = -120
    for (i in all_Sum_Corr) {
        svg.data(data).
            append("g")
            .append("text")
            .text("Sum(|cor|): " + all_Sum_Corr[i].toFixed(3))
            .attr("x", x_count += 130)
            .attr("y", 0)
            .attr("font-size", "13px")
            .attr("fill", "black");
    }
    mar = 20;
    size = sizeWhole / allVar.length

    var position = d3.scalePoint()
        .domain(allVar)
        .range([0, sizeWhole - size])

    for (i in allVar) {
        for (j in allVar) {
            var var1 = allVar[i]
            var var2 = allVar[j]

            var col2data = data.map(function (d) { return +d[var1] })
            var col3data = data.map(function (d) { return +d[var2] })
            var corr = getCorrelation(col2data, col3data).toFixed(3).toString()

            if (var1 === var2) {
                svg.append('g')
                    .attr("transform", "translate(" + position(var1) + "," + position(var2) + ")")
                    .append('text')
                    .attr("x", size / 2)
                    .attr("y", size / 2)
                    .text(var1)
                    .attr("text-anchor", "middle")

            } else {
                xextent = d3.extent(data, function (d) { return +d[var1] })
                var x = d3.scaleLinear()
                    .domain(xextent).nice()
                    .range([0, size - 2 * mar]);

                yextent = d3.extent(data, function (d) { return +d[var2] })

                var y = d3.scaleLinear()
                    .domain(yextent).nice()
                    .range([size - 2 * mar, 0]);

                var each_plot = svg
                    .append('g')
                    .attr("transform", "translate(" + (position(var1) + mar) + "," + (position(var2) + mar) + ")");

                each_plot.append("g")
                    .attr("transform", "translate(" + 0 + "," + (size - mar * 2) + ")")
                    .call(d3.axisBottom(x).ticks(3));
                each_plot.append("g")
                    .call(d3.axisLeft(y).ticks(3))

                each_plot
                    .selectAll("myCircles")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("cx", function (d) { return x(+d[var1]) })
                    .attr("cy", function (d) { return y(+d[var2]) })
                    .attr("r", 1.1)
                    .attr("fill", "black")

                each_plot.append("text")
                    .attr("class", "y label")
                    .attr("text-anchor", "end")
                    .attr("y", -20)
                    .attr("x", -3)
                    .attr("transform", "rotate(-90)")
                    .text(var2)
                    .style("font-size", 10)

                each_plot.append("text")
                    .attr("class", "x label")
                    .attr("text-anchor", "end")
                    .attr("y", 108)
                    .attr("x", 90)
                    .text(var1)
                    .style("font-size", 10)

                each_plot.data(data).
                    append("g")
                    .append("text")
                    .text("<Correlation: " + corr + ">")
                    .attr("x", -2)
                    .attr("y", 119)
                    .attr("font-size", 10)
                    .attr("fill", "red");

            }
        }
    }
})