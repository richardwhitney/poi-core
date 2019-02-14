const PointOfInterest = require('./app/controllers/pointOfInterest');

module.exports = [
  { method: 'GET', path: '/', config: PointOfInterest.home},
  { method: 'GET', path: '/signup', config: PointOfInterest.signup},
  { method: 'GET', path: '/login', config: PointOfInterest.login},
  { method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    }
  }
];