
const express = require("express");
const staff = require("../controller/staffController");
const verifyToken = require("../middleware/verifyToken");
const status = require("../controller/statusController");
exports.router = (function () {
  let apiStaff = express.Router();
  // register user
  apiStaff.route("/register").post(staff.register);

  // connection user
  apiStaff.route("/login").post(staff.logIn);

  // deconnection user
  apiStaff.route("/logout").post(verifyToken, staff.logOut);

  /*   // reconnect user
    apiUser.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  apiStaff.route("/staff/:id").get(verifyToken, staff.myInfo);

  // edit profile
  apiStaff.route("/staff/:id/edit").patch(verifyToken, staff.updateInfo);


  // health check
  apiStaff.route("/").get(status.healthCheck);
  /*  
 
   // info user
   apiUser.route("/info/:id").get(verifyToken, user.infoUser);
 
   
 
   // lost password - client
   apiRouter.route("/lost").post(user.lostPassword);
 
   // lost password - website
   apiRouter.route("/lost/reset").post(user.resetPassword); */

  return apiStaff;
})();