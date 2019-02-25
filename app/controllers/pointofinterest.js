'use strict';

const PointOfInterest = require('../models/poi');
const Joi = require('joi');
const cloudinary = require('cloudinary');

if (typeof (process.env.CLOUDINARY_URL) == 'undefined') {
  console.warn('!! cloudinary config is undefined !!');
  console.warn('export CLOUDINARY_URL or set dotenv file');
}
else {
  console.log('cloudinary config:');
  console.log(cloudinary.config());
}

const PointOfInterestController = {
  addPhoto: {
    payload: {
      maxBytes: 209715200,
      output: 'file',
      parse: true
    },
    handler: async function(request, h) {
      try {
        console.log("Point id: " + request.params.id);
        const point = await PointOfInterest.findById(request.params.id);
        const file = request.payload.image.path;
        const data = request.payload;
        console.log('path: ' + file);
        if (request.body) {
          console.log("Data");
        }
        cloudinary.uploader.upload(file, { tags: 'poi_test'})
          .then(async function (image) {
            console.log("file uploaded to cloudinary");
            console.dir(image);
            point.imageUrl = image.secure_url;
            await point.save();
          });
        return h.view('poi', {
          title: 'Explore Island of Ireland',
          point: point
        });
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  },
  deletePoint: {
    handler: async function(request, h) {
      try {
        PointOfInterest.findByIdAndRemove(request.params.id, function(err) {
          if (err) {
            console.log('Error: Point not deleted');
          }
          else {
            console.log('Success: Point deleted');
          }
        });
        return h.redirect('/home');
      } catch (e) {
        return h.view('main', { errors:[{ message: e.message}]});
      }
    }
  }
};

module.exports = PointOfInterestController;