const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model
const User = require("../models/User");
const { forwardAuthenticated, ensureAuthenticated } = require("../config/auth");

// Login Page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// Register Page
router.get("/register", forwardAuthenticated, (req, res) =>
  res.render("register")
);
//, bio, gender, birthday
//|| !gender || !birthday
//      bio,gender,birthday,
// Register
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ $or: [{ email: email }, { name: name }] }).then((user) => {
      if (user) {
        errors.push({ msg: "Email or Username is already taken" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          details: {
            authority: 3,
            theme: "light",
            appearOffline: false,
          },
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash(
                  "success_msg",
                  "You are now registered and can log in"
                );
                req.login(user, (err) => {
                  if (err) {
                    console.log(err);
                  }
                  res.redirect("/home");
                });
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

router.get("/:id", ensureAuthenticated, (req, res) => {
  User.findById(req.params.id)
    .then((person) =>
      res.render("profile", {
        user: req.user,
        person,
      })
    )
    .catch((err) => console.log(err));
});

//Post a message
router.post("/:id/sendmessage", ensureAuthenticated, (req, res) => {
  User.findById(req.params.id)
    .then((person) => {
      let message = {
        head: {
          senderId: req.user.id,
          name: req.user.name,
          avatar: req.user.avatarURL,
          date: Date.now(),
        },
        body: req.body.message,
        replies: [],
      };
      person.messages.push(message);
      person
        .save()
        .then((user) => {
          res.redirect("/users/" + user.id);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

//Reply to a message
router.post("/:id/message/:index/reply", ensureAuthenticated, (req, res) => {
  let index = req.params.index;
  User.findById(req.params.id)
    .then((person) => {
      let reply = {
        head: {
          senderId: req.user.id,
          name: req.user.name,
          avatar: req.user.avatarURL,
          date: Date.now(),
        },
        body: req.body.reply,
      };
      person.messages[index].replies.push(reply);
      person.markModified("messages");
      person
        .save()
        .then((user) => {
          res.redirect("/users/" + user.id);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.get("/:id/follow", ensureAuthenticated, (req, res) => {
  let userId = req.params.id;
  if (userId !== req.user.id) {
    Promise.all([
    User.findById(userId),
    User.findById(req.user.id)
    ]
    ).then(([user, person]) => {
      // console.table(`user = ${user}
      // ________________
      // person = ${person}
      // `);
      // user is the owner of the profile
      // person is the one following
        if (!user.followers.includes(person.id)) {
          user.followers.push(person.id);
          person.following.push(user.id);
          Promise.all([
            user.save(),
            person.save()
          ]
          ).then(
            res.json({
              followers: user.followers.length,
              message: true,
            })
          );
        } else {
          let index = user.followers.indexOf(req.user.id);
            person.following.splice(index, 1);
            user.followers.splice(index, 1);
            Promise.all([
              user.save(),
              person.save()
            ]).then(() => {
                res.json({
                  followers: user.followers.length,
                  message: true,
                });
              });
        }
        

      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.json({
      message: false,
    });
  }
});
module.exports = router;
