'use strict';

const User = require('../models/user');
const Boom = require('boom');

const Accounts = {
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view('main', {title: 'Welcome to Islands of Ireland'});
    }
  },
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view('signup', { title: 'Sign up to IoI'});
    }
  },
  signup: {
    auth: false,
    handler: async function (request, h) {
      const payload = request.payload;
      const newUser = new User({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password
      });
      const user = await newUser.save();
      request.cookieAuth.set({ id: user.id });
      return h.redirect('/home');
    }
  },
  showLogin: {
    auth: false,
    handler: function (request, h) {
      return h.view('Login', { title: 'Login to IoI'});
    }
  },
  login: {
    auth: false,
    handler: async function (request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = 'Email address is not registered';
          throw new Boom(message);
        }
        user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect('/home');
      } catch (e) {
        return h.view('login', { errors: [{ message: e.message}]});
      }
    }
  },
  logout: {
    auth: false,
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect('/');
    }
  },
  showSettings: {
    handler: function (request, h) {
      var email = request.auth.credentials.id;
      const userDetails = this.users[email];
      return h.view('settings', { title: 'IoI Settings', user: userDetails});
    }
  },
  updateSettings: {
    handler: function (request, h) {
      const user = request.payload;
      this.users[user.email] = user;
      return h.redirect('/settings');
    }
  },
};

module.exports = Accounts;