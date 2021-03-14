
// Draw chart
const drawChart = async () => {
    // Access data
    const dataset = await d3.json("./../../../data/seattle_wa_weather_data.json");
    const xAccessor = d => d.dewPoint;
    const yAccessor = d => d.humidity;

    // Create chart dimensions
    const width = d3.min([
        window.innerWidth * 0.9,
        window.innerHeight * 0.9,
    ]);
    const dimensions = (() => {
        let dimensions = {
            width: width,
            height: width,
            margin: {
                top: 10,
                right: 10,
                bottom: 50,
                left: 60,
            },
        };
        dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
        dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
        return dimensions;
    })();

    // Draw canvas
    const wrapper = d3.select("#wrapper")
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .style("border", `1px solid #ededed`);

    // Bounds
    const bounds = wrapper.append("g")
        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

    // Create scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth])
        .nice();
    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.boundedHeight, 0])
        .nice();

    // Draw dots
    function drawDots(dataset, color) {
        const dots = bounds.selectAll("circle").data(dataset)
        dots
            .enter().append("circle")
            .merge(dots)
            .attr("cx", d => xScale(xAccessor(d)))
            .attr("cy", d => yScale(yAccessor(d)))
            .attr("r", 5)
            .attr("fill", color)
    }
    drawDots(dataset.slice(0, 200), "darkgrey");

    // Draw peripherals
    // xAxis
    const xAxisGenerator = d3.axisBottom()
        .scale(xScale);
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
        .style("transform", `translateY(${dimensions.boundedHeight}px)`);
    const xAxisLabel = xAxis.append("text")
        .attr("x", dimensions.boundedWidth / 2)
        .attr("y", dimensions.margin.bottom - 10)
        .attr("fill", "black")
        .style("font-size", "1.4em")
        .html("Dew point (&deg;F)");
    // - yAxis
    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
        .ticks(4);
    const yAxis = bounds.append("g")
        .call(yAxisGenerator);
    const yAxisLabel = yAxis.append("text")
        .attr("x", -dimensions.boundedHeight / 2)
        .attr("y", -dimensions.margin.left + 25)
        .attr("fill", "black")
        .style("font-size", "1.4em")
        .text("Relative humidity")
        .style("transform", "rotate(-90deg)")
        .style("text-anchor", "middle");

    // Introducing other metric
    const colorAccessor = d => d.cloudCover;
    const colorScale = d3.scaleLinear()
        .domain(d3.extent(dataset, colorAccessor))
        .range(["skyblue", "darkslategrey"]);

    // Draw dots with color scale
    drawDots(dataset.slice(200, dataset.length), d => colorScale(colorAccessor(d)));
};
drawChart();