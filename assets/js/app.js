// @TODO: YOUR CODE HERE!

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("./assets/data/data.csv").then(function(x) {
    console.log(x);
    x.forEach(function(y) {
        y.poverty =+ y.poverty;
        y.healthcareLow =+ y.healthcareLow;

    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(x, d => d.poverty), d3.max(x, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(x, d => d.healthcareLow), d3.max(x, d => d.healthcareLow)])
    .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(x)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcareLow))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

     var elem = chartGroup.selectAll("g")
        .data(x);
    
    var elemEnter = elem.enter()
        .append("g")
        .attr("transform", d => `translate(${xLinearScale(d.poverty)} , ${yLinearScale(d.healthcareLow)})`)
    
    elemEnter.append("text")
        .attr("dx", function(d){return -10})
        .attr("dy", function(d){return +5})
        .attr("fill", "black")
        .text(function(d){return d.abbr});
    
    var circle = elemEnter.append("circle")
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", "0.3");

var elem = chartGroup.selectAll("g")
.data(x);

var elemEnter = elem.enter()
.append("g")
.attr("transform", d => `translate(${xLinearScale(d.poverty)} , ${yLinearScale(d.healthcareLow)})`)

elemEnter.append("text")
.attr("dx", function(d){return -10})
.attr("dy", function(d){return +5})
.attr("fill", "black")
.text(function(d){return d.abbr});

var circle = elemEnter.append("circle")
.attr("r", "15")
.attr("fill", "blue")
.attr("opacity", "0.3");

    // // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Number of Billboard 100 Hits");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Hair Metal Band Hair Length (inches)");
  }).catch(function(error) {
    console.log(error);
  });