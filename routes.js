const Controller = require('./controllers/controller');

module.exports = [{ method: 'GET', path: '/', config: Controller.index}];