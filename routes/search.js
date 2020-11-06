const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const Book = require("../models/Book");
const User = require("../models/User");

const genres = [
  "action",
  "adventure",
  "fanfiction",
  "horror",
  "romance",
  "sci-fi",
];
router.get("/", ensureAuthenticated, (req, res) => {
  let { search = null } = req.query;
  if (search) {
    Promise.all([
      Book.find({ title: { $regex: search, $options: "i" } }),
      User.find({ name: { $regex: search, $options: "i" } }),
    ])
      .then(([books, people]) => {
        console.log(people);
        res.render("search", {
          genres,
          user: req.user,
          books,
          people,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.render("search", {
      user: req.user,
      genres,
      books: [],
      people: [],
    });
  }
});

router.get("/genres/:genre", ensureAuthenticated, (req, res) => {
  let genre = req.params.genre;
  Book.find({ genre: genre }).then((books) => {
    res.render("genre", {
      genre,
      user: req.user,
      books,
    });
  });
});

module.exports = router;
