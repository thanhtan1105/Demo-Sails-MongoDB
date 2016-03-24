/**
 * Token.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    tokenId: {
      type: 'string'

    },

    kind: {
      type: 'string' // android or iOS
    },

    // Add a reference to Notification
    owner: {
      model: 'Notifications'
    }
  },

  createToken: function createToken(params, callback) {
    Token.create({
      tokenId: params["token"],
      kind: params["kind"],
      owner: params["owner"]

    }).exec(callback);
  },

  toJSON: function() {
    var object = this.toObject();
    return object;
  }



};

