const express = require("express");
const user = require("../controller/userController");
const verifyTokenUser = require("../middleware/verifyTokenUser");
const upload = require("../utils/multer");

exports.router = (function () {
  let apiUser = express.Router();
  // register user
  apiUser.route("/register").post(user.register);

  // connection user
  apiUser.route("/login").post(user.logIn);

  // deconnection user
  apiUser.route("/logout").post(verifyTokenUser, user.logOut);

  /*   // reconnect user
    apiUser.route("/reconnect").post(verifyToken, lastView, user.reconnectUser); */

  /*   // my info
    apiUser.route("/user/:id").get(verifyTokenUser, user.myInfo); */

  // my reconnection
  apiUser.route("/user/reconnect").get(verifyTokenUser, user.reconnectUser);

  // edit profile
  apiUser.route("/user/:id/edit").patch(verifyTokenUser, upload.single('image'), user.updateInfo);

  // my info
  apiUser.route("/user/:id").patch(upload.single('image'), user.uploadUser);

  return apiUser;
})();