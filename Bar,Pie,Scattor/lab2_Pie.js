var width = 400;
var height = 400;
radius = Math.min(width, height) / 2;

var svg = d3.select("#mypiechart")
    .append("svg")
    .attr("width", width)
    .attr("height", height).append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var color = d3.scaleOrdinal()
    .domain("Wrost", "Bad", "Normal", "Good", "Best")
    .range(['#4daf4a', '#377eb8', '#ff7f00', '#984ea3', '#e41a1c']);

function MakePie(data) {

    var pie = d3.pie()
        .sort(function (a, b) { return d3.ascending(a.key, b.key) })
        .value(function (d) { return d.value; })

    var data_ready = pie(d3.entries(data))

    var arc = d3.arc().innerRadius(0).outerRadius(radius)

    var slice = svg.selectAll('mySlice')
        .data(data_ready)

    slice.enter()
        .append('path')
        .merge(slice)
        .attr('d', arc)
        .attr('fill', d => color(d.data.key))
        .attr('stroke', 'white')
        .attr('stroke-width', '1px');

    slice.enter().append('text')
        .text(function (d) { if (d.data.value != 0) return (d.data.value / 265 * 100).toFixed(2) + "%" })
        .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", 14)
}

document.addEventListener('DOMContentLoaded', () => {
    var select = document.querySelector('#select1')
    var p = document.querySelector('#p1')
    var p3 = document.querySelector('#p3')
    select.addEventListener('change', (event) => {
        const options = event.currentTarget.options
        const index = options.selectedIndex
        var a = 0, b = 0, c = 0, d = 0, e = 0;
        d3.csv("Qualityoflife.csv", function (data) {
            for (var i = 0; i < data.length; i++) {
                var obj = data[i]
                var h = +obj[Object.keys(obj)[index ]]
                if (h < 2) {
                    a++;
                } else if (h < 4) {
                    b++;
                }
                else if (h < 6) {
                    c++;
                }
                else if (h < 8) {
                    d++;
                }
                else {
                    e++;
                }
                var data1 = { Worst: a, Bad: b, Normal: c, Good: d, Best: e }
            }
            console.log(data1)
            MakePie(data1)
            p3.textContent = `Total = ${a + b + c + d + e} [ Worst: ${a} / Bad: ${b} / Normal: ${c} / Good: ${d} / Best: ${e} ]`
        })
        p.textContent = `Choose: ${options[options.selectedIndex].textContent}`
    })
})