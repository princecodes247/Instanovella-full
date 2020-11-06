const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
//Load user model
const User = require("../models/User");

router.get("/", ensureAuthenticated, (req, res) =>
  res.render("notificationsettings", {
    user: req.user,
  })
);
module.exports = router;
