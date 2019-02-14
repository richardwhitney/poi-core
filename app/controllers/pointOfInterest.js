'use strict';

const PointOfInterest = {
  home: {
    handler: function (request, h) {
      return h.view('main', { title: 'Points of Interest'});
    }
  },
  signup: {
    handler: function (request, h) {
      return h.view('signup', { title: 'Sign up for Points of Interest'});
    }
  }
}

module.exports = PointOfInterest;