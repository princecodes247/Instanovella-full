const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  avatarURL: {
    type: String,
    default: "/assets/user1.png",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: {
    type: Array,
    default: [],
  },
  following: {
    type: Array,
    default: [],
  },
  books: {
    type: Array,
    default: [],
  },
  messages: {
    type: Array,
    default: [],
  },
  blocking: {
    type: Array,
    default: [],
  },
  blockedBy: {
    type: Array,
    default: [],
  },
  details: {
    type: Object,
    default: {
      authority: 3,
      theme: "light",
      bio: "",
      gender: "He",
      birthday: "12-12-2000",
      appearOffline: false,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.index({ name: "text" });
const User = mongoose.model("User", UserSchema);

module.exports = User;
