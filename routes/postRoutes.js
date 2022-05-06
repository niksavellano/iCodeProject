const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads");
  },

  filename: (req, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

//Home page
router.get("/", postController.postIndex);

//About Page
router.get("/about", postController.about);

// Create Post page
router.get("/create-post", postController.createPage);

//Store page
router.get("/store", postController.store);

router.post(
  "/create-posts",
  upload.single("image"),
  postController.postCreatePost
);

router.get("/posts/:id", postController.postGetOne);

router.delete("/posts/:id", postController.postDelete);

router.get("/all-posts", postController.postAll);

//404 error page
router.use(postController.page404);

module.exports = router;
