/**
 * Notifications.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var Token = require('./Token');

module.exports = {
  autoPK: true,
  autoCreatedAt: true,
  autoUpdatedAt: true,
  schema: true,
  attributes: {
    appName: {
      type: 'string',
    },

    token: {
      collection: 'Token',
      via: 'owner'
    }
  },

  // function
  createNotification : function(options, callback) {
    var appName = options["appName"];
    Notifications.create({appName: appName}).exec(callback);
  },

  toJSON: function() {
    var object = this.toObject();
    return object;
  }

};

