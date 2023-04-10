var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width1 = 460 - margin.left - margin.right,
    height1 = 400 - margin.top - margin.bottom;

var svg2 = d3.select("#mybarchart")
    .append("svg")
    .attr("width", width1 + margin.left + margin.right)
    .attr("height", height1 + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var y = d3.scaleLinear()
    .range([height1, 0])
    .domain([0, 200]);

var x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, width1]);

var ylen = function (d) { return d.length }

function makecolor(z) {
    if (z < 2) {
        return '#4daf4a'
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
    else {
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

    rectangle.enter()
        .append("rect")
        .merge(rectangle)
        .attr("class", "bar")
        .attr("x", 1)
        .attr("transform", function (d) {
            return "translate(" + x(d.x0) + "," + y(d.length) + ")";
        })
        .attr("width", function (d) { return x(d.x1) - x(d.x0); })
        .attr("height", function (d) { return height1 - y(d.length); })
        .attr("fill", function (d) { return makecolor(d.x0) });
    
        svg2.append("circle").attr("cx",50).attr("cy",30).attr("r", 6).style("fill", '#4daf4a')
        svg2.append("circle").attr("cx",50).attr("cy",50).attr("r", 6).style("fill", '#377eb8')
        svg2.append("circle").attr("cx",50).attr("cy",70).attr("r", 6).style("fill", '#ff7f00')
        svg2.append("circle").attr("cx",50).attr("cy",90).attr("r", 6).style("fill", '#984ea3')
        svg2.append("circle").attr("cx",50).attr("cy",110).attr("r", 6).style("fill", '#e41a1c')
        svg2.append("text").attr("x", 80).attr("y", 30).text("Worst").style("font-size", "13px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 80).attr("y", 50).text("Bad").style("font-size", "13px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 80).attr("y", 70).text("Normal").style("font-size", "13px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 80).attr("y", 90).text("Good").style("font-size", "13px").attr("alignment-baseline","middle")
        svg2.append("text").attr("x", 80).attr("y", 110).text("Best").style("font-size", "13px").attr("alignment-baseline","middle")
}


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
        p.textContent = `Choose: ${options[options.selectedIndex].textContent}`
    })
})