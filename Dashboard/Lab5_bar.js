var margin = { top: 50, right: 10, bottom: 10, left: 40 },
    width1 = 420 - margin.left - margin.right,
    height1 = 400 - margin.top - margin.bottom;

var svg2 = d3.select("#mybarchart")
    .append("svg")
    .attr("width", width1 + margin.left + margin.right + 20)
    .attr("height", height1 + margin.top + margin.bottom + 100)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")
    ;

var y = d3.scaleLinear()
    .range([height1, 0])
    .domain([0, 200]);

var x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width1]);

var ylen = function (d) { return d.length }

function makecolor(z) {
    if (z < 2) {
        return 'yellow'
    }
    else if (z < 4) {
        return '#377eb8'
    }
    else if (z < 6) {
        return '#ff7f00'
    }
    else if (z < 8) {
        return '#984ea3'
    }
    else if (z < 10) {
        return '#e41a1c'
    }
}
function scattormakecolor(z) {
    if (z == 0) {
        return "#69b3a2"
    }
    else if (z <= 2) {
        return 'yellow'
    }
    else if (z <= 4) {
        return '#377eb8'
    }
    else if (z <= 6) {
        return '#ff7f00'
    }
    else if (z <= 8) {
        return '#984ea3'
    }
    else if (z <= 10) {
        return '#e41a1c'
    }
}

function MakeBar(data) {
    svg2.append("g")
        .attr("transform", "translate(0," + height1 + ")")
        .call(d3.axisBottom(x));

    svg2.append("g")
        .call(d3.axisLeft(y));

    var histogram = d3.histogram()
        .value(function (d) { return +d; })
        .domain(x.domain())
        .thresholds(x.ticks(4));

    var bins = histogram(data);

    var rectangle = svg2.selectAll("rect")
        .data(bins)


    var colorlist = []
    var colorlist2 = []
    var square_num = 0;
    var cor_col = []
    rectangle.enter()
        .append("rect")
        .merge(rectangle)
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
            square_num = d.x1;
            if (colorlist.includes(makecolor(d.x0))) {
                for (let i = 0; i < colorlist.length; i++) {
                    if (colorlist[i] == makecolor(d.x0)) {
                        colorlist.splice(i, 1)
                    }
                }
                d3.select(this).style("fill", "#69b3a2");
            }
            else {
                d3.select(this).style("fill", function (d) { return makecolor(d.x0) });
                colorlist.push(makecolor(d.x0))
            }
            console.log(colorlist)
            if (colorlist2.includes(scattormakecolor(d.x1))) {
                for (let i = 0; i < colorlist2.length; i++) {
                    if (colorlist2[i] == scattormakecolor(d.x1)) {
                        colorlist2.splice(i, 1)
                        cor_col.splice(i, 1)
                    }
                }
                scattor.style("fill", function (d) { let difference = cor_col.filter(x => d[attr_name].includes(x)); return scattormakecolor(difference) });
                scattor2.style("fill", function (d) { console.log(d[attr_name]); let difference = cor_col.filter(x => d[attr_name].includes(x)); return scattormakecolor(difference) });
                path1.style("stroke", function (d) {
                    let lst = []; if (d[attr_name] < 2) { lst.push(2) } else if (d[attr_name] < 4) { lst.push(4) } else if (d[attr_name] < 6) { lst.push(6) } else if (d[attr_name] < 8) { lst.push(8) } else if (d[attr_name] < 10) { lst.push(10) }
                    let difference = cor_col.filter(x => lst.includes(x)); return scattormakecolor(difference)
                });

            }
            else {
                cor_col.push(square_num)
                scattor.style("fill", function (d) { let difference = cor_col.filter(x => d[attr_name].includes(x)); return scattormakecolor(difference) });
                scattor2.style("fill", function (d) { let difference = cor_col.filter(x => d[attr_name].includes(x)); return scattormakecolor(difference) });
                path1.style("stroke", function (d) {
                    let lst = []; if (d[attr_name] < 2) { lst.push(2) } else if (d[attr_name] < 4) { lst.push(4) } else if (d[attr_name] < 6) { lst.push(6) } else if (d[attr_name] < 8) { lst.push(8) } else if (d[attr_name] < 10) { lst.push(10) }
                    let difference = cor_col.filter(x => lst.includes(x)); return scattormakecolor(difference)
                });
                colorlist2.push(scattormakecolor(square_num))
            }
            console.log(colorlist2)
            console.log(cor_col)
        }
        )
    svg2.append("circle").attr("cx", 35).attr("cy", 30).attr("r", 4).style("fill", 'yellow')
    svg2.append("circle").attr("cx", 35).attr("cy", 50).attr("r", 4).style("fill", '#377eb8')
    svg2.append("circle").attr("cx", 35).attr("cy", 70).attr("r", 4).style("fill", '#ff7f00')
    svg2.append("circle").attr("cx", 35).attr("cy", 90).attr("r", 4).style("fill", '#984ea3')
    svg2.append("circle").attr("cx", 35).attr("cy", 110).attr("r", 4).style("fill", '#e41a1c')
    svg2.append("text").attr("x", 65).attr("y", 30).text("0-2: Worst").style("font-size", "9px").attr("alignment-baseline", "middle").style("fill", 'yellow')
    svg2.append("text").attr("x", 65).attr("y", 50).text("2-4: Bad").style("font-size", "9px").attr("alignment-baseline", "middle").style("fill", '#377eb8')
    svg2.append("text").attr("x", 65).attr("y", 70).text("4-6: Normal").style("font-size", "9px").attr("alignment-baseline", "middle").style("fill", '#ff7f00')
    svg2.append("text").attr("x", 65).attr("y", 90).text("6-8: Good").style("font-size", "9px").attr("alignment-baseline", "middle").style("fill", '#984ea3')
    svg2.append("text").attr("x", 65).attr("y", 110).text("8-10: Best").style("font-size", "9px").attr("alignment-baseline", "middle").style("fill", '#e41a1c')

    svg2.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -22)
        .attr("x", -130)
        .attr("transform", "rotate(-90)")
        .text("Number of City")
        .style("font-size", 10)

    svg2.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", 370)
        .attr("x", 220)
        .text("level")
        .style("font-size", 12)
}

var attr_name = ""
document.addEventListener('DOMContentLoaded', () => {
    var select = document.querySelector('#select1')
    var p = document.querySelector('#p1')
    select.addEventListener('change', (event) => {
        const options = event.currentTarget.options
        const index = options.selectedIndex
        const lst = []

        d3.csv("Qualityoflife.csv", function (data) {

            for (var i = 0; i < data.length; i++) {
                var obj = data[i]
                lst.push(+obj[Object.keys(obj)[index]])
            }
            MakeBar(lst)
        })
        attr_name = options[options.selectedIndex].textContent;

    })
})
var margin = { top: 30, right: 30, bottom: 16, left: 60 },
    width = 520 - margin.left - margin.right,
    height = 420 - margin.top - margin.bottom;

var svg3 = d3.select("#mybiplot2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


d3.csv("Lab5_pcaplot.csv", function (data) {

    var x = d3.scaleLinear()
        .domain([-5, 5])
        .range([0, width]);
    svg3.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    var y = d3.scaleLinear()
        .domain([-5, 5])
        .range([height, 0]);

    svg3.append("g")
        .attr("transform", "translate(" + 0 + ", 0)")
        .call(d3.axisLeft(y));

    scattor = svg3.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.Principal_Component_1); })
        .attr("cy", function (d) { return y(d.Principal_Component_2); })
        .attr("r", 3)

    scattor.style("fill", "#69b3a2")

    

    svg3
        .call(d3.brush()
            .extent([[0, 0], [width, height]]).on("start brush", updateChart)
        )
    function updateChart() {
        extent = d3.event.selection
        scattor.classed("selected", function (d) { return isBrushed(extent, x(d.Principal_Component_1), y(d.Principal_Component_2)) })
        scattor2.classed("selected", function (d) { return isBrushed(extent, x(d.x), y(d.y)) })

    }

    function isBrushed(brush_coords, cx, cy) {
        var x0 = brush_coords[0][0],
            x1 = brush_coords[1][0],
            y0 = brush_coords[0][1],
            y1 = brush_coords[1][1];
        return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
    }
})

d3.csv('Lab5_biplot.csv', function (data) {
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
        svg3.append("path").datum(newdt).attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(function (d) { return x(d.x) })
                .y(function (d) { return y(d.y) }))

        svg3.append("g").selectAll("text").data(newdt).enter().append("text").attr("x", function (d) { return x(d.x - 0.5) })
            .attr("y", function (d) { return y(d.y * 1.15) }).attr("fill", "red")
            .text(function (d) { return d.attribute })
            .style("font-size", 7)

    }
})

var svg1 = d3.select("#MDSplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var scattor2 = ''
d3.csv("Lab5_MDS.csv", function (data) {
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
        .attr("x", -160)
        .attr("transform", "rotate(-90)")
        .text("Dimension 2")
        .style("font-size", 12)

    svg1.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("y", 365)
        .attr("x", 260)
        .text("Dimension1")
        .style("font-size", 12)

    scattor2 = svg1.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return x(d.x); })
        .attr("cy", function (d) { return y(d.y); })
        .attr("r", 3)
    scattor2.style("fill", "#69b3a2")

})

var margin = { top: 30, right: 30, bottom: 10, left: 60 },
    width4 = 300,
    height4 = 400;

var svg4 = d3.select("#Parallel_coordinates")
    .append("svg")
    .attr("width", width4 + margin.left + margin.right + 20)
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
    var x = d3.scalePoint()
        .range([0, width4])
        .domain(dimensions);

    function path(d) {
        return d3.line()(dimensions.map(function (p) { return [x(p), y[p](d[p])]; }));
    }

    path1 = svg4.selectAll("Path")
        .data(data)
        .enter().append("path")
        .attr("d", path)
        .style("opacity", 0.5)
        .style("fill", "none")

    path1.style("stroke", "#69b3a2")

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
var svg19 = d3.select("#chord")
    .append("svg")
    .attr("width", 440)
    .attr("height", 440)
    .append("g")
    .attr("transform", "translate(220,220)");

d3.csv("Qualityoflife.csv", function (data) {
    var matrix = [];
    for (var j = 1; j < 10; j++) {
        var lst = [];
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            lst.push(+obj[Object.keys(obj)[j]]);
        }
        matrix.push(lst);
    }
    var colors = ["#440154ff", "#31668dff", "#37b578ff", "#fde725ff", "red", "blue", "yellow", "black", "orange"];
    var names = ['Housing', 'Cost of Living', 'Commute', 'Business Freedom', 'Safety', 'Education', 'Environmental Quality', 'Economy', 'Taxation'];

    var res = d3.chord()
        .padAngle(0.05)
        .sortSubgroups(d3.descending)
        (matrix);

    // 그룹 아크 생성
    svg19
        .datum(res)
        .append("g")
        .selectAll(".group")
        .data(function (d) { return d.groups; })
        .enter()
        .append("path")
        .style("fill", function (d, i) { return colors[i]; })
        .style("stroke", "black")
        .attr("d", d3.arc()
            .innerRadius(200)
            .outerRadius(210)
        );

    svg19.selectAll(".group-label")
        .data(function (d) { return d.groups; })
        .enter()
        .append("text")
        .attr("dy", ".35em")
        .attr("transform", function (d) {
            var angle = (d.startAngle + d.endAngle) / 2;
            var radius = 220;
            var x = radius * Math.cos(angle);
            var y = radius * Math.sin(angle);

            // 텍스트가 뒤집히지 않도록 회전 각도를 조절합니다.
            var rotation = angle * 180 / Math.PI - 90;
            if (angle > Math.PI) {
                rotation -= 180;
            }

            return "translate(" + x + "," + y + ") rotate(" + rotation + ")";
        })
        .text(function (d, i) {
            return names[i];
        });

    // Chord 연결선 생성
    svg19
        .datum(res)
        .append("g")
        .selectAll(".chord")
        .data(function (d) { return d; })
        .enter()
        .append("path")
        .attr("d", d3.ribbon()
            .radius(200)
        )
        .style("fill", function (d) { return colors[d.source.index]; })
        .style("stroke", "black");
});

