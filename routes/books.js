const skip = 0;
const limit = 5;
const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloundinary Config
cloudinary.config({
  cloud_name: "wecode247", //process.env.CLOUD_NAME,
  api_key: "455579844239615", //process.env.API_KEY,
  api_secret: "mmLOAmzRBOMTjZITgPt0R7JfcFI", //process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bookCovers",
    format: async (req, file) => "png",
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const parser = multer({ storage: storage });

const { ensureAuthenticated } = require("../config/auth");

// Load Book model
const Book = require("../models/Book");

//Load user model
const User = require("../models/User");

//Get a list of all books particular
router.get("/", ensureAuthenticated, (req, res) => {
  console.log("connected");
  let { skip = 0, limit = 10, listGenre = "all", sort = "des" } = req.query;
  skip = Number(skip);
  limit = Number(limit);
  Book.aggregate([
    {
      $group: {
        _id: {},
      },
    },
  ]);
  Book.find().then((books) => {
    res.json(books);
  });
});

//Get a particular Book
router.get("/:id", ensureAuthenticated, (req, res) => {
  Book.findById(req.params.id)
    .then((book) =>
      res.render("story", {
        user: req.user,
        book,
      })
    )
    .catch((err) => console.log(err));
});

// Create a book

//parser.single("bcover"),
router.post("/create", ensureAuthenticated, (req, res) => {
  //let coverURL = req.file.path
  let coverURL = "/assets/book_cover.jpg";

  let bookAuthor = req.user;
  const { title, genre, desc, tags } = req.body;

  let errors = [];

  if (!title || !genre || !desc) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (errors.length > 0) {
    res.render("createbook", {
      errors,
      title,
      genre,
      desc,
      tags,
      user: req.user,
    });
  } else {
    Book.findOne({ title: title }).then((book) => {
      if (book) {
        errors.push({ msg: "Book already exists" });

        res.render("createbook", {
          user: req.user,
          errors,
          title,
          genre,
          desc,
          tags,
        });
      } else {
        const newBook = new Book({
          author: bookAuthor.name,
          coverURL,
          title,
          genre,
          desc,
          tags,
        });

        newBook
          .save()
          .then((book) => {
            User.findById(bookAuthor.id).then((user) => {
              let userBook = {
                id: String(book._id),
                coverURL: book.coverURL,
                title: book.title,
                desc: book.desc,
                genre: book.genre,
                tags: book.tags,
                reads: book.reads,
                stars: book.stars,
              };
              user.books.push(userBook);

              user
                .save()
                .then((user) => console.log(user))
                .catch((err) => console.log(err));

              req.flash(
                "success_msg",
                "The Book has been successfully created "
              );

              res.redirect("/mybooks");
            });
          })
          .catch((err) => console.log(err));

        // For the cover photo
        console.log(req.file); // to see what is returned to you
      }
    });
  }
});

//Add Chapter
router.get("/:id/add", ensureAuthenticated, (req, res) => {
  let bookId = req.params.id;
  Book.findById(bookId)
    .then((book) => {
      if (book.author === req.user.name) {
        res.render("addchapter", {
          user: req.user,
          book,
        });
        console.log(book);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/:id/add", ensureAuthenticated, (req, res) => {
  let bookId = req.params.id;
  let { title, story } = req.body;
  Book.findById(bookId, (err, book) => {
    book.chapters.push({
      title,
      story,
    });
    book
      .save()
      .then((book) => {
        res.render("story", {
          user: req.user,
          book,
        });
        console.log(book);
      })
      .catch((err) => console.log(err));
  }).catch((err) => {
    console.log(err);
  });
});

router.get("/:id/star", ensureAuthenticated, (req, res) => {
  let bookId = req.params.id;

  Book.findById(bookId)
    .then((book) => {
      if (!book.stars.includes(req.user.id)) {
        book.stars.push(req.user.id);
        book.save().then(
          res.json({
            stars: book.stars.length,
            message: true,
          })
        );
      } else {
        let index = book.stars.indexOf(req.user.id);
        if (index > -1) {
          book.stars.splice(index, 1);
          book.save().then(() => {
            res.json({
              stars: book.stars.length,
              message: false,
            });
          });
        } else {
          res.json({
            stars: book.stars.length,
            message: true,
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// Display Chapters
router.get("/:id/:chapter", ensureAuthenticated, (req, res) => {
  let bookId = req.params.id;
  let chapter = Math.abs(Number(req.params.chapter)) - 1 || 0;
  Book.findById(bookId)
    .then((book) => {
      let first = chapter === 0 ? true : false;

      let last = chapter + 1 == book.chapters.length ? true : false;
      res.render("chapter", {
        bookTitle: book.title,
        first,
        last,
        chapterTitle: book.chapters[chapter].title,
        story: book.chapters[chapter].story,
      });
      console.log(book);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
