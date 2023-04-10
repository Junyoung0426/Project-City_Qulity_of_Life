var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var svg3 = d3.select("#scree")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height+100 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Lab3_screeplot.csv", function (data) {
    var x = d3.scaleBand()
        .range([0, width])
        .domain(data.map(function (d) { return d.number; }))
        .padding(0.2);
    svg3.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "end");

    var y = d3.scaleLinear()
        .domain([0, 0.5])
        .range([height, 0]);
    
        svg3.append("g")
        .call(d3.axisLeft(y));

    svg3.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width - 200)
        .attr("y", height + 40)
        .text("Principal Component")
        .style("font-size", 12)
    
        svg3.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -40)
        .attr("x",-170)
        .attr("transform", "rotate(-90)")
        .text("Variance Explained")
        .style("font-size", 12)

    svg3.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.number); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", "#69b3a2")

})