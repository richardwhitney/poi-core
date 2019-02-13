/*
 * Entry point for the app
 *
 */
"use strict";

const Hapi = require("hapi");

// Create local server object
const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

// Load the route
server.route(require('./routes'));

// Init function to start server
async function init() {
  await server.register(require('inert'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

// Catch and log errors on server start. Exit app
process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();

