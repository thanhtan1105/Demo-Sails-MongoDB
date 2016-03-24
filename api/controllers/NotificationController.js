/**
 * NotificationControllerController
 *
 * @description :: Server-side logic for managing Notificationcontrollers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Noti = require('../models/Notifications');

module.exports = {

  register: function(request, response) {
    if (!request.body.appName || !request.body.os || ! request.body.token) {
      return response.json({status: "400", message: "Missing param"});
    }

    Notifications.findOne({appName: request.body.appName}).exec(function (error, notification) {
      if (error) return next(error);
      console.log("Notification :" + notification);

      var paramsToken = {
        token : request.body.token,
        kind : request.body.os
      };

      if (!notification) {
        // not found, create new app
        var params = {
          appName: request.body.appName
        };

        Notifications.createNotification(params, function (error, notification) {
          // add Token
          if (error) {
            console.log(error);
            return response.json({status: "401", message: "fail create notification"});
          }

          paramsToken.owner = notification.id;
          Token.createToken(paramsToken, function(error, token) {
            if (error) return response.json({status: "401", message: "fail create token"});
            return response.json({status: "200", message: "Create Success"});
          });
        });
      } else {
        paramsToken.owner = notification;
        Token.createToken(paramsToken, function(error, token) {
          console.log("Token :" + token);
          if (error) {
            console.log("Error:" + error);
            return response.json({status: "401", message: "fail create token"});
          }
          return response.json({status: "200", message: "Create Success"});
        });
      }

      // if exites notification
      // CREATE new Token model
      // Append to Notification Model
      //Token.createToken(params, function(error, token) {
      //  if (error) return response.json({status: "401", message: "Fail create Token"});
      //  return response.json({status: "200", message: "Create Success"});
      //});

    });
  }
};

