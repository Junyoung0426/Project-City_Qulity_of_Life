var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 560 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var svg = d3.select("#pca")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height+100 + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Lab3_pcaplot.csv", function (data) {
  var x = d3.scaleLinear()
    .domain([-5, 5])
    .range([0, width]);

  svg.append("g")
    .attr("transform", "translate(0," + height / 2 + ")")
    .call(d3.axisBottom(x))

  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("y", 270)
    .attr("x", 480)
    .text("PC 1")
    .style("font-size", 14)
    .attr("fill", "blue")

  var y = d3.scaleLinear()
    .domain([-5, 5])
    .range([height, 0]);

  svg.append("g")
    .attr("transform", "translate(" + width / 2 + ", 0)")
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -30)
    .attr("x", -220)
    .attr("transform", "rotate(-90)")
    .text("PC 2")
    .style("font-size", 14)
    .attr("fill", "blue")

  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.Principal_Component_1); })
    .attr("cy", function (d) { return y(d.Principal_Component_2); })
    .attr("r", 1.5)
    .style("fill", "#69b3a2")

})