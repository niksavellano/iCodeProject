const Posts = require("../models/post");

const postIndex = (req, res) => {
  Posts.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { posts: result, title: "Home" });
    });
};

const postCreatePost = (req, res) => {
  const posst = new Posts(req.body);
  console.log(req.body);
  posst
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

const postGetOne = (req, res) => {
  const id = req.params.id;
  Posts.findById(id).then((result) => {
    res.render("details", { post: result, title: "Home" });
  });
};

const postDelete = (req, res) => {
  const id = req.params.id;
  Posts.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const postAll = (req, res) => {
  Posts.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

const about = (req, res) => {
  res.render("about", { title: "About" });
};

const createPage = (req, res) => {
  res.render("posts", { title: "Create Post" });
};

const page404 = (req, res) => {
  res.status(404).render("404");
};

module.exports = {
  postIndex,
  postCreatePost,
  postGetOne,
  postDelete,
  postAll,
  about,
  createPage,
  page404,
};
