
const express = require("express");
const user = require("../controller/userController");
const verifyToken = require("../middleware/verifyToken");

exports.router = (function () {
  let apiUser = express.Router();
  // register user
  apiUser.route("/register").post(user.register);

  // connection user
  apiUser.route("/login").post(user.logIn);

  // deconnection user
  apiUser.route("/logout").post(verifyToken, user.logOut);

  /*   // reconnect user
    apiUser.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  apiUser.route("/user/:id").get(verifyToken, user.myInfo);

  // edit profile
  apiUser.route("/user/:id/edit").patch(verifyToken, user.updateInfo);

  /*  
 
   // info user
   apiUser.route("/info/:id").get(verifyToken, user.infoUser);
 
   
 
   // lost password - client
   apiRouter.route("/lost").post(user.lostPassword);
 
   // lost password - website
   apiRouter.route("/lost/reset").post(user.resetPassword); */

  return apiUser;
})();