'use strict';

const PointOfInterest = require('../models/poi');
const Category = require('../models/category');
const Joi = require('joi');

const Dashboard = {
  home: {
    handler: async function (request, h) {
      const pointsofInterest = await PointOfInterest.find().populate('category');
      const categories = await Category.find();
      return h.view('dashboard', {
        title: 'Explore Islands of Ireland',
        points: pointsofInterest,
        categories: categories
      });
    }
  },
  addPointOfInterest: {
    validate: {
      payload: {
        category: Joi.string().required(),
        name: Joi.string().required(),
        description: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: async function (request, h, error) {
        const pointsOfInterest = await PointOfInterest.find();
        const categories = await Category.find();
        return h.view('dashboard', {
          title: 'Add island error',
          points: pointsOfInterest,
          categories: categories,
          errors: error.details
        }).takeover().code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const data = request.payload;
        const rawCategory = request.payload.category;
        const category = await Category.findOne({
          name: rawCategory
        });
        const newPoint = new PointOfInterest({
          name: data.name,
          description: data.description,
          category: category._id
        });
        await newPoint.save();
        return h.redirect('/home');
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  },
  pointDetails: {
    handler: async function(request, h) {
      try {
        console.log("Point selected: " + request.params.id);
        const point = await PointOfInterest.findById(request.params.id);
        return h.view('poi', {
          title: 'Explore Island of Ireland',
          point: point
        });
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  }
};

module.exports = Dashboard;