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

server.bind({
  users: {},
});

// Init function to start server
async function init() {
  await server.register(require('inert'));
  await server.register(require('vision'));
  await server.register(require('hapi-auth-cookie'));

  // Configure handlebars
  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
    isCached: false
  });

  server.auth.strategy('standard', 'cookie', {
    password: 'secretpasswordnotrevealedtoanyone',
    cookie: 'poi-cookie',
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/'
  });

  server.auth.default({
    mode: 'required',
    strategy: 'standard',
  });

  // Load the route
  server.route(require('./routes'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

// Catch and log errors on server start. Exit app
process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();

