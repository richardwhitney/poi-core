'use strict';

const dotenv = require('dotenv');

const result = dotenv.config();

if (result.error) {
  console.log(result.error.message);
  process.exit(1);
}

const Mongoose = require('mongoose');

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

db.on('error', function (err) {
  console.log(`database connection error: ${err}`);
});

db.on('disconnect', function () {
  console.log('database disconnected');
});

db.once('open', function () {
  console.log(`database connected to ${this.name} on ${this.host}`);
});