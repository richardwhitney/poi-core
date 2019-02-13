const PointOfInterest = require('./app/controllers/pointOfInterest');

module.exports = [{ method: 'GET', path: '/', config: PointOfInterest.home}];