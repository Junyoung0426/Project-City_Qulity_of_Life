var margin2 = { top2: 12, right2: 25, bottom2: 25, left2: 55 },
    width2 = 460 - margin2.left2 - margin2.right2,
    height2 = 400 - margin2.top2 - margin2.bottom2;

var svg3 = d3.select("#myscattorplot")
    .append("svg")
    .attr("width", width2 + margin2.left2 + margin2.right2)
    .attr("height", height2 + margin2.top2 + margin2.bottom2)
    .append("g")
    .attr("transform",
        "translate(" + margin2.left2 + "," + margin2.top2 + ")");

function makeScattor(data) {
    svg3.selectAll("circle").remove();
    var x3 = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width2]);

    var y3 = d3.scaleLinear()
        .domain([0, 10])
        .range([height2, 0]);

    svg3.append("g")
        .attr("transform", "translate(0," + height2 + ")")
        .call(d3.axisBottom(x3));

    svg3.append("g")
        .call(d3.axisLeft(y3));

    var dot = svg3.append('g')
        .selectAll("dot")
        .data(data)

    dot.enter()
        .append("circle")
        .attr("cx", function (d) { return x3(d[0]) })
        .attr("cy", function (d) { return y3(d[1]) })
        .attr("r", 2)
        .style("fill", "orange")
}
function getCheckboxValue() {
    const checks2 = 'input[name = "x1"]:checked';
    const checkEls2 = document.querySelectorAll(checks2);
    var p = document.querySelector('#p2')
    var list = []
    var list2 = []
    checkEls2.forEach((el) => {
        var intel = parseInt(el.value)
        if (list.length <= 0) {
            list.push(intel);
            list2.push(el.id)
        }
        else {
            list.pop()
            list2.pop()
            alert("You should choose only 1 X axes and 1 Y axes")
        }
    })
    const checks = 'input[name = "y"]:checked';
    const checkEls = document.querySelectorAll(checks);
    var p = document.querySelector('#p2')

    checkEls.forEach((el) => {
        var intel = parseInt(el.value)
        if (list.length != 0) {
            list.push(intel);
            list2.push(el.id)
        }
        if (list.length >= 3) {
            list.pop()
            list2.pop()
            alert("You should choose only 1 X axes and 1 Y axes")
        }
    })
    p.textContent = `X =  ${list2[0]}  /   Y =  ${list2[1]}`

    console.log(list2)
    const lst2 = []
    if (list.length == 2) {
        d3.csv("Qualityoflife.csv", function (data) {
            for (var i = 0; i < data.length; i++) {
                const lst1 = []
                var obj = data[i]
                lst1.push(+obj[Object.keys(obj)[list[0]]])
                lst1.push(+obj[Object.keys(obj)[list[1]]])
                lst2.push(lst1)
            }
            makeScattor(lst2)
        })
    }

}





