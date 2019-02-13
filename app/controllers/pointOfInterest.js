'use strict';

const PointOfInterest = {
  home: {
    handler: function (request, h) {
      return h.view('main', { title: 'Points of Interest'});
    }
  }
}

module.exports = PointOfInterest;