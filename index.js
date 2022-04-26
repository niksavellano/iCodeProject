const express = require("express");
const morgan = require("morgan");
const dbURI = "mongodb+srv://root:mongo@cluster0.vvw84.mongodb.net/test";
const Posts = require("./models/post");

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
const mongoose = require("mongoose");
const { render } = require("express/lib/response");
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");

app.post("/create-posts", (req, res) => {
  console.log(req.body);
  const posst = new Posts(req.body);

  posst
    .save()
    .then((result) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  Posts.findById(id).then((result) => {
    res.render("details", { post: result });
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;
  Posts.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-posts", (req, res) => {
  Posts.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/", (req, res) => {
  Posts.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { posts: result, title: "Home" });
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/create-post", (req, res) => {
  res.render("posts", { title: "Create Post" });
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(8080, () => {
  console.log("server running on 8080");
});
