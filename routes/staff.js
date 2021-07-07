
const express = require("express");
//controller
const staff = require("../controller/staffController");

//middleware
const verifyToken = require("../middleware/verifyToken");
const role = require("../middleware/role");

//healthcheck
const status = require("../controller/statusController");

//multer
const upload = require("../utils/multer");


exports.router = (function () {
  let apiStaff = express.Router();
  // register user
  apiStaff.route("/register").post(verifyToken, role(['admin']), staff.register);

  // connection user
  apiStaff.route("/login").post(staff.logIn);

  // deconnection user
  /*  apiStaff.route("/logout").post(verifyToken, staff.logOut); */

  /*   // reconnect user
    apiUser.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  // my info
  apiStaff.route("/staff/:id").get(verifyToken, staff.myInfo);

  // edit profile
  apiStaff.route("/staff/:id").patch(verifyToken, upload.single('image'), staff.updateInfo);

  //reconnection
  apiStaff.route("/reconnect").get(verifyToken, staff.reconnectStaff);

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