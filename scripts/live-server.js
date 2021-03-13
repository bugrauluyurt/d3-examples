#!/usr/bin/env node
const liveServer = require("live-server");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const argv = yargs(hideBin(process.argv)).argv;

const EXAMPLES = [
    "01-making-your-first-chart",
    "02-making-a-scatterplot",
];

const getMountPoints = () => {
    return EXAMPLES.reduce((acc, exampleRoute) => {
        return [...acc, [`/${exampleRoute}`, `./examples/${exampleRoute}`]];
    }, []);
};

const init = () => {
    const params = {
        port: 8181, // Set the server port. Defaults to 8080.
        host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
        root: argv.root || "./", // Set root directory that's being served. Defaults to cwd.
        file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications),
        mount: getMountPoints(), // mount a directory to a route
    };
    liveServer.start(params);
};

init();



