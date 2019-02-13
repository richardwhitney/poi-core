const PointofInterest = require('./app/controllers/pointOfInterest');

module.exports = [{ method: 'GET', path: '/', config: PointofInterest.home}];