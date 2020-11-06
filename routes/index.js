const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Book = require("../models/Book");

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
  })
);
router.get("/notifications", ensureAuthenticated, (req, res) =>
  res.render("notifications", {
    user: req.user,
  })
);

router.get("/profile", ensureAuthenticated, (req, res) =>
  res.render("profile", {
    user: req.user,
  })
);
router.get("/mybooks", ensureAuthenticated, (req, res) =>
  res.render("mybooks", {
    user: req.user,
  })
);

router.get("/createbook", ensureAuthenticated, (req, res) =>
  res.render("createbook", {
    user: req.user,
  })
);

router.get("/about", ensureAuthenticated, (req, res) =>
  res.render("about", {
    user: req.user,
  })
);

module.exports = router;
