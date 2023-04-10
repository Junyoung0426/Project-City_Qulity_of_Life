
var margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 570 - margin.left - margin.right,
    height = 510 - margin.top - margin.bottom;

var svg11 = d3.select("#kmeans_bar")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

function k_makecolor(z) {
    if (z == 0) {
        return 'yellow'
    }
    else if (z == 1) {
        return '#377eb8'
    }
    else if (z == 2) {
        return '#ff7f00'
    }
    else if (z == 3) {
        return '#984ea3'
    }
    else if (z == 4) {
        return '#e41a1c'
    }
    else {
        return "black";
    }
}

function k_makecolor2(z) {
    if (z == 0) {
        return "#69b3a2"
    }
    else if (z == 1) {
        return 'yellow'
    }
    else if (z == 2) {
        return '#377eb8'
    }
    else if (z == 3) {
        return '#ff7f00'
    }
    else if (z == 4) {
        return '#984ea3'
    }
    else if (z == 5) {
        return '#e41a1c'
    }
    else {
        return "black";
    }
}

d3.csv("Lab4_clusters.csv", function (data) {

    var y = d3.scaleLinear()
        .range([height1, 0])
        .domain([0, 200]);

    var x = d3.scaleLinear()
        .domain([0, 6])
        .range([0, width1])
        ;
    var i = 0;
    var cluster = ["", "Cluster1", "Cluster2", "Cluster3", "Cluster4", "Cluster5", "Cluster6"]
    svg11.append("g")
        .attr("transform", "translate(0," + height1 + ")")
        .call(d3.axisBottom(x).ticks(6))
        .selectAll("text")
        .style("text-anchor", "end")
        .text(function (d) { i++; return cluster[i] })
        .attr("x", 60);

    svg11.append("g")
        .call(d3.axisLeft(y));

    var histogram2 = d3.histogram()
        .value(function (d) { return +d.Clusters; })
        .domain(x.domain())
        .thresholds(x.ticks(6));

    var bins2 = histogram2(data);

    var rectangle2 = svg11.selectAll("rect2")
        .data(bins2)
    var colorlist3 = []
    var colorlist4 = []
    var square_num1 = 0;
    var cor_col1 = []
    rectangle2.enter()
        .append("rect")
        .merge(rectangle2)
        .attr("class", "bar")
        .attr("x", 1)
        .attr("style", "outline: thin solid black;")
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) { return x(d.x1) - x(d.x0); })
        .attr("height", function (d) { return height1 - y(d.length); })
        .attr("fill", "#69b3a2")
        .on("click", function (d) {
            square_num1 = d.x1;
            if (colorlist3.includes(k_makecolor(d.x0))) {
                for (let i = 0; i < colorlist3.length; i++) {
                    if (colorlist3[i] == k_makecolor(d.x0)) {
                        colorlist3.splice(i, 1)
                    }
                }
                d3.select(this).style("fill", "#69b3a2");
            }
            else {
                d3.select(this).style("fill", function (d) { return k_makecolor(d.x0) });
                colorlist3.push(k_makecolor(d.x0))
            }
            console.log(colorlist3)
            if (colorlist4.includes(k_makecolor2(d.x1))) {
                for (let i = 0; i < colorlist4.length; i++) {
                    if (colorlist4[i] == k_makecolor2(d.x1)) {
                        colorlist4.splice(i, 1)
                        cor_col1.splice(i, 1)
                    }
                }
                scattor3.style("fill", function (d) { let difference = cor_col1.filter(x => d["Clusters"].includes(x)); return k_makecolor2(difference) });
                scattor4.style("fill", function (d) { let difference = cor_col1.filter(x => d["Clusters"].includes(x)); return k_makecolor2(difference) });
                path3.style("stroke", function (d) { let difference = cor_col1.filter(x => d["Clusters"].includes(x)); return k_makecolor2(difference) });

            }
            else {
                cor_col1.push(square_num1)
                scattor3.style("fill", function (d) { let difference = cor_col1.filter(x => d["Clusters"].includes(x)); return k_makecolor2(difference) });
                scattor4.style("fill", function (d) { let difference = cor_col1.filter(x => d["Clusters"].includes(x)); return k_makecolor2(difference) });
                path3.style("stroke", function (d) { let difference = cor_col1.filter(x => d["Clusters"].includes(x)); return k_makecolor2(difference) });

                colorlist4.push(k_makecolor2(square_num1))
            }
            console.log(colorlist4)
            console.log(cor_col1)
        }
        );
        svg11.append("circle").attr("cx", 395).attr("cy", 30).attr("r", 6).style("fill", 'yellow')
        svg11.append("circle").attr("cx", 395).attr("cy", 50).attr("r", 6).style("fill", '#377eb8')
        svg11.append("circle").attr("cx", 395).attr("cy", 70).attr("r", 6).style("fill", '#ff7f00')
        svg11.append("circle").attr("cx", 395).attr("cy", 90).attr("r", 6).style("fill", '#984ea3')
        svg11.append("circle").attr("cx", 395).attr("cy", 110).attr("r", 6).style("fill", '#e41a1c')
        svg11.append("circle").attr("cx", 395).attr("cy", 130).attr("r", 6).style("fill", 'black')
        svg11.append("text").attr("x", 425).attr("y", 30).text("Cluster 1").style("font-size", "14px").attr("alignment-baseline", "middle").style("fill", 'yellow')
        svg11.append("text").attr("x", 425).attr("y", 50).text("Cluster 2").style("font-size", "14px").attr("alignment-baseline", "middle").style("fill", '#377eb8')
        svg11.append("text").attr("x", 425).attr("y", 70).text("Cluster 3").style("font-size", "14px").attr("alignment-baseline", "middle").style("fill", '#ff7f00')
        svg11.append("text").attr("x", 425).attr("y", 90).text("Cluster 4").style("font-size", "14px").attr("alignment-baseline", "middle").style("fill", '#984ea3')
        svg11.append("text").attr("x", 425).attr("y", 110).text("Cluster 5").style("font-size", "14px").attr("alignment-baseline", "middle").style("fill", '#e41a1c')
        svg11.append("text").attr("x", 425).attr("y", 130).text("Cluster 6").style("font-size", "14px").attr("alignment-baseline", "middle").style("fill", 'black')
        svg11.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -35)
        .attr("x", -200)
        .attr("transform", "rotate(-90)")
        .text("Number of City")
        .style("font-size", 15)

    svg11.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", 500)
        .attr("x", 230)
        .text("level")
        .style("font-size", 15)
        
})


var svg10 = d3.select("#kmeans_elbow")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Lab4_elbow.csv", function (data) {
    var x = d3.scaleLinear()
        .domain([0, 40])
        .range([0, width]);
    svg10.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([0, 10000])
        .range([height, 0]);
    svg10.append("g")
        .attr("transform", "translate(" + 0 + ", 0)")
        .call(d3.axisLeft(y));

        svg10.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -50)
        .attr("x", -200)
        .attr("transform", "rotate(-90)")
        .text("Inertia")
        .style("font-size", 15)

    svg10.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", 480)
        .attr("x", 290)
        .text("Number of Cluster")
        .style("font-size", 15)

    svg10.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.cluster_number); })
        .attr("cy", function (d) { return y(d.inertia); })
        .attr("r", function (d) { if (x(d.cluster_number == 6)) { return 6 } else { return 4 } })
        .style("fill", function (d) { if (x(d.cluster_number == 6)) { return "red" } else { return "#69b3a2" } });
    var line = d3.line()
        .x(function (d) { return x(d.cluster_number); })
        .y(function (d) { return y(d.inertia); })
        .curve(d3.curveMonotoneX)

    svg10.append("path")
        .datum(data)
        .attr("class", "line")

        .attr("d", line)
        .style("fill", "none")
        .style("stroke", "#69b3a2")
        .style("stroke-width", "2");
})


var svg = d3.select("#kmeans_mybiplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


d3.csv("Lab4_pcaplot.csv", function (data) {

    var x = d3.scaleLinear()
        .domain([-5, 5])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    svg.append("text")
        .text("PC1")
        .attr("y", 480)
        .attr("x", 225)
        .style("font-size", 15)
      

    var y = d3.scaleLinear()
        .domain([-5, 5])
        .range([height, 0]);
    svg.append("g")
        .attr("transform", "translate(" + 0 + ", 0)")
        .call(d3.axisLeft(y));
    svg.append("text")
        .text("PC2")
        .attr("x", -50)
        .attr("y", 225)
        .style("font-size", 15)
        

    scattor3 = svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Principal_Component_1); })
        .attr("cy", function (d) { return y(d.Principal_Component_2); })
        .attr("r", 3)
    scattor3.style("fill", "#69b3a2")

})

d3.csv('Lab4_biplot.csv', function (data) {
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


var svg8 = d3.select("#kmeans_MDSplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

d3.csv("Lab4_MDS.csv", function (data) {
    var x = d3.scaleLinear()
        .domain([-13, 13])
        .range([0, width]);

    svg8.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))

    var y = d3.scaleLinear()
        .domain([-13, 13])
        .range([height, 0]);

    svg8.append("g")
        .attr("transform", "translate(" + 0 + ", 0)")
        .call(d3.axisLeft(y));

    svg8.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -30)
        .attr("x", -200)
        .attr("transform", "rotate(-90)")
        .text("Dimension 2")
        .style("font-size", 15)

    svg8.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", 480)
        .attr("x", 290)
        .text("Dimension1")
        .style("font-size", 15)

    scattor4 = svg8.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 3)
    scattor4.style("fill", "#69b3a2")

})


var margin4 = { top: 30, right: 30, bottom: 30, left: 60 },
    width4 = 500,
    height4 = 500;

var svg9 = d3.select("#Parallel_coordinates")
    .append("svg")
    .attr("width", width4 + margin4.left + margin.right)
    .attr("height", height4 + margin4.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin4.left + "," + margin4.top + ")");

var svg9 = d3.select("#kmeans_Parallel_coordinates")
    .append("svg")
    .attr("width", width4 + margin4.left + margin4.right + 200)
    .attr("height", height4 + 200 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin4.left + "," + margin4.top + ")");


d3.csv("Lab4_Parallel.csv", function (data) {
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
    var x = d3.scalePoint()
        .range([0, width4])
        .domain(dimensions);

    function path(d) {
        return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
    }

    path3 = svg9.selectAll("Path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .style("opacity", 0.5)
        .style("fill", "none").style("stroke", "#69b3a2")

    svg9.selectAll("myAxis")
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