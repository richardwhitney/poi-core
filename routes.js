const Accounts = require('./app/controllers/accounts');
const Dashboard = require('./app/controllers/dashboard');
const PointOfInterestController = require('./app/controllers/pointofinterest');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index},
  { method: 'GET', path: '/signup', config: Accounts.showSignup},
  { method: 'GET', path: '/login', config: Accounts.showLogin},
  { method: 'GET', path: '/logout', config: Accounts.logout},
  { method: 'POST', path: '/signup', config: Accounts.signup},
  { method: 'POST', path: '/login', config: Accounts.login},
  { method: 'GET', path: '/settings', config: Accounts.showSettings},
  { method: 'POST', path: '/settings', config: Accounts.updateSettings},

  { method: 'GET', path: '/home', config: Dashboard.home},
  { method: 'POST', path: '/addpoint', config: Dashboard.addPointOfInterest},
  { method: 'GET', path: '/poi/{id}', config: Dashboard.pointDetails},

  { method: 'POST', path: '/poi/addPhoto/{id}', config: PointOfInterestController.addPhoto},
  { method: 'GET', path: '/poi/deletePoint/{id}', config: PointOfInterestController.deletePoint},
  { method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: './public/images',
        listing: true
      }
    },
    options: { auth: false }
  }
];