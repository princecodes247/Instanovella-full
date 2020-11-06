const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
//Load user model
const User = require("../models/User");
// List of possible themes
let themes = ["light", "hacker", "dark", "pinky", "navy", "scifi"];

router.get("/", ensureAuthenticated, (req, res) =>
  res.render("settings", {
    user: req.user,
  })
);

router.get("/security", ensureAuthenticated, (req, res) =>
  res.render("securitysettings", {
    user: req.user,
  })
);

router.get("/themes", ensureAuthenticated, (req, res) =>
  res.render("themes", {
    user: req.user,
    themes,
  })
);

router.get("/themes/:theme", ensureAuthenticated, (req, res) => {
  if (themes.includes(req.params.theme)) {
    User.findById(req.user.id).then((user) => {
      user.details.theme = "scifi";
      user.markModified("details");
      user.save().catch((err) => console.log(err));
      res.json({
        theme: user.details.theme,
      });
    });
  }
});

router.use("/account", require("./account.js"));
router.use("/notifications", require("./notifications.js"));

module.exports = router;
