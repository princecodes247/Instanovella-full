const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { ensureAuthenticated } = require("../config/auth");
//Load user model
const User = require("../models/User");

router.get("/", ensureAuthenticated, (req, res) =>
  res.render("accountsettings", {
    user: req.user,
  })
);
router.get("/:form", ensureAuthenticated, (req, res) =>
  res.render("accountsettingsforms", {
    user: req.user,
    form: req.params.form,
  })
);

router.post("/username", ensureAuthenticated, (req, res) => {
  let { username, password } = req.body;
  console.log(password);
  // Match user
  User.findOne({
    name: req.user.name,
  }).then((user) => {
    if (!user) {
      console.log("no such user");
    }
    // Check if the new username is taken

    else {
      User.findOne({
        name: username,
      }).then(person => {

        if (!person) {
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
              user.name = username;
              user
                .save()
                .then((user) => {
                  res.render("profile", {
                    user: req.user,
                    person: user
                  }
                  )
                })
                .catch((err) => console.log(err));
            } else {
              console.log("password does not match");
            }
          });
        }
      })
    }
  });
});

router.post("/email", ensureAuthenticated, (req, res) => {
  let { email, password } = req.body;
  console.log(password);
  // Match user
  User.findOne({
    name: req.user.name,
  }).then((user) => {
    if (!user) {
      console.log("no such user");
    }

    User.findOne({
      email,
    }).then((person) => {
      if (!person) {
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            user.email = email;
            user
              .save()

              .catch((err) => console.log(err));
          } else {
            console.log("password does not match");
          }
        });
      } else {
        console.log("Email is already taken");
      }
    });
  });
});

module.exports = router;
