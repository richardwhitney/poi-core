const PointOfInterest = {
  home: {
    handler: function (request, h) {
      return h.file('./app/view/main.html');
    }
  }
}

module.exports = PointOfInterest;