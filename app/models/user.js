'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lasntName: String,
  email: String,
  password: String
});

module.exports = Mongoose.model('User', userSchema);