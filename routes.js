const PointOfInterest = require('./app/controllers/pointOfInterest');

module.exports = [
  { method: 'GET', path: '/', config: PointOfInterest.home},
  { method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  }
];