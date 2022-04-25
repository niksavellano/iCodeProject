const express = require("express");
const morgan = require("morgan");

const app = express();

// app.use(morgan());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  let posts = [
    { title: "Title 1", snippet: "Title 1 Snippet" },
    { title: "Title 2", snippet: "Title 2 Snippet" },
    { title: "Title 3", snippet: "Title 3 Snippet" },
  ];

  let tagline = "putangina";
  res.render("index", { posts, title: "Home" });
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
