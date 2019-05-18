'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const studentSchema = new Schema({
  studentnumber: String,
  name: String,
  college: String,
  country: String
});

module.exports = Mongoose.model('Student', studentSchema);