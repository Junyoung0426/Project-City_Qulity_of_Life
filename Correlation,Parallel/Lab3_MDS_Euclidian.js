var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 760 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

var svg1 = d3.select("#MDSplot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + 100 + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Lab3_MDS_Euclidian.csv", function (data) {
  var x = d3.scaleLinear()
    .domain([-13, 13])
    .range([0, width]);

  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  var y = d3.scaleLinear()
    .domain([-13, 13])
    .range([height, 0]);

  svg1.append("g")
    .attr("transform", "translate(" + 0 + ", 0)")
    .call(d3.axisLeft(y));

  svg1.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -30)
    .attr("x", -300)
    .attr("transform", "rotate(-90)")
    .text("Dimension 2")
    .style("font-size", 14)

  svg1.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("y", 700)
    .attr("x", 380)
    .text("Dimension1")
    .style("font-size", 14)

  svg1.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.x); })
    .attr("cy", function (d) { return y(d.y); })
    .attr("r", 3)
    .style("fill", "#69b3a2")

})