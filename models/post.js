const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      data: Buffer,
      type: String,
      default: "placeholder.jpg",
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Posts = mongoose.model("posts", postSchema);

module.exports = Posts;
