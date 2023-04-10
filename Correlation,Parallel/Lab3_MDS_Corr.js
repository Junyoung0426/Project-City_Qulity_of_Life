var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


var svg = d3.select("#MDSplot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Lab3_MDS_Corr.csv", function (data) {
  var x = d3.scaleLinear()
    .domain([-0.8, 0.8])
    .range([0, width]);
  
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))

  var y = d3.scaleLinear()
    .domain([-0.8, 0.8])
    .range([height, 0]);
  
    svg.append("g")
    .attr("transform", "translate(" + 0 + ", 0)")
    .call(d3.axisLeft(y));
  
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -30)
    .attr("x", -140)
    .attr("transform", "rotate(-90)")
    .text("Dimension 2")
    .style("font-size", 10)

  svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("y", 390)
    .attr("x", 215)
    .text("Dimension1")
    .style("font-size", 10)

  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d.x); })
    .attr("cy", function (d) { return y(d.y); })
    .attr("r", 3.5)
    .style("fill", "#69b3a2")
  svg.append("g").selectAll("text").data(data).enter().append("text").attr("x", function (d) { return x(d.x - 0.06) })
    .attr("y", function (d) { return y(d.y - 0.07) }).attr("fill", "red")
    .text(function (d) { return d.attri })
    .style("font-size", 7)
})


