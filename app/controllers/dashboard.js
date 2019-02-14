'use strict';

const Dashboard = {
  home: {
    handler: function (request, h) {
      return h.view('dashboard', { title: 'Explore Islands of Ireland'});
    }
  }
};

module.exports = Dashboard;