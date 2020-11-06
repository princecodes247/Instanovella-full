const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  coverURL: {
    type: String,
    default: "/assets/book_cover.jpg",
  },

  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  reads: {
    type: Array,
    default: [],
  },
  tags: {
    type: Array,
    default: [],
    required: true,
  },
  stars: {
    type: Array,
    default: [],
  },
  chapters: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
BookSchema.index({ title: "text", tags: 1 });
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
