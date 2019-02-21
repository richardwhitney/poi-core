'use strict';

const PointOfInterest = require('../models/poi');

const Dashboard = {
  home: {
    handler: async function (request, h) {
      const pointsofInterest = await PointOfInterest.find();
      return h.view('dashboard', {
        title: 'Explore Islands of Ireland',
        points: pointsofInterest
      });
    }
  },
  addPointOfInterest: {
    handler: async function(request, h) {
      try {
        const data = request.payload;
        const newPoint = new PointOfInterest({
          name: data.name,
          description: data.description
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