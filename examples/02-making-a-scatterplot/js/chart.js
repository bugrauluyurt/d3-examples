
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
                left: 50,
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

    // Draw data
    // dataset.forEach(d => {
    //     bounds.append("circle")
    //         .attr("cx", xScale(xAccessor(d)))
    //         .attr("cy", yScale(yAccessor(d)))
    //         .attr("r", 5)
    //     });

    const dots = bounds.selectAll("circle")
        .data(dataset)
        .enter().append("circle")
        .attr("cx", d => xScale(xAccessor(d)))
        .attr("cy", d => yScale(yAccessor(d)))
        .attr("r", 5)
        .attr("fill", "cornflowerblue");
};
drawChart();