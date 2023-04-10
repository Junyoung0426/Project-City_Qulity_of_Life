var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 660 - margin.left - margin.right,
  height = 600 - margin.top - margin.bottom;


var svg = d3.select("#biplot")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");


d3.csv("Lab3_pcaplot.csv", function (data) {

  var x = d3.scaleLinear()
    .domain([-5, 5])
    .range([0, width]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
  svg.append("text")
    .text("PC1")
    .attr("y", 590)
    .attr("x", 275)
    .style("font-size", 12)
    .attr("fill", "blue")

  var y = d3.scaleLinear()
    .domain([-5, 5])
    .range([height, 0]);
  svg.append("g")
    .attr("transform", "translate(" + 0 + ", 0)")
    .call(d3.axisLeft(y));
  svg.append("text")
    .text("PC2")
    .attr("x", -50)
    .attr("y", 285)
    .style("font-size", 12)
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

d3.csv('Lab3_biplot.csv', function (data) {
  console.log(data)
  var x = d3.scaleLinear()
    .domain([-5, 5])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([-5, 5])
    .range([height, 0]);

  for (var i = 0; i < data.length / 2; i++) {
    var newdt = []
    newdt.push(data[2 * i])
    newdt.push(data[2 * i + 1])
    console.log(newdt[1].attribute)
    
    svg.append("path").datum(newdt).attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.x) })
        .y(function (d) { return y(d.y) }))

    svg.append("g").selectAll("text").data(newdt).enter().append("text").attr("x", function (d) { return x(d.x - 0.5) })
      .attr("y", function (d) { return y(d.y * 1.15) }).attr("fill", "red")
      .text(function (d) { return d.attribute })
      .style("font-size", 7)

  }
})