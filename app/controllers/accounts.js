'use strict';

const Accounts = {
  index: {
    handler: function (request, h) {
      return h.view('main', {title: 'Welcome to Islands of Ireland'});
    }
  },
  showSignup: {
    handler: function (request, h) {
      return h.view('signup', { title: 'Sign up to IoI'});
    }
  },
  signup: {
    handler: function (request, h) {
      return h.redirect('/home');
    }
  },
  showLogin: {
    handler: function (request, h) {
      return h.view('Login', { title: 'Login to IoI'});
    }
  },
  login: {
    handler: function (request, h) {
      return h.redirect('/home');
    }
  },
  logout: {
    handler: function (request, h) {
      return h.redirect('/');
    }
  }
};

module.exports = Accounts;