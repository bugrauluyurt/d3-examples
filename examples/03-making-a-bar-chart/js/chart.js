// Accessors
const metricAccessor = d => d.humidity;
const yAccessor = d => d.length;

// Constants
const DOM_ELEMENT_ID = {
    WRAPPER: "#wrapper"
};
const WIDTH = 600;
const BINS_COUNT = 12;

// Create dimensions
const dimensions = (() => {
    let dimensions = {
        width: WIDTH,
        height: WIDTH * 0.6,
        margin: {
            top: 30,
            right: 10,
            bottom: 50,
            left: 50,
        },
    };
    dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
    return dimensions;
})();

async function drawLineChart() {
    const dataset = await d3.json("./../../../data/seattle_wa_weather_data.json");
    // Draw canvas
    const wrapper = d3.select(DOM_ELEMENT_ID.WRAPPER)
        .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height);

    // Bounds
    const bounds = wrapper.append("g")
        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

    // Create Scales
    const xScale = d3.scaleLinear()
        .domain(d3.extent(dataset, metricAccessor))
        .range([0, dimensions.boundedWidth])
        .nice();

    // Creating Bins
    const binsGenerator = d3.histogram()
        .domain(xScale.domain())
        .value(metricAccessor)
        .thresholds(BINS_COUNT);
        // Info => Bins can also be specified in a custom manner ([0, 0.2, 0.4, 0.6, 0.8, 1])
    const bins = binsGenerator(dataset);

    // Creating the y scale
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(bins, yAccessor)])
        .range([dimensions.boundedHeight, 0])
        .nice();
}
drawLineChart();