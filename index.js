const express = require("express");
const morgan = require("morgan");
const dbURI = "mongodb+srv://root:mongo@cluster0.vvw84.mongodb.net/test";

const app = express();

app.use(morgan("dev"));
app.use(express.static("public"));
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");

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

app.use(postRoutes);

app.listen(8080, () => {
  console.log("server running on 8080");
});
