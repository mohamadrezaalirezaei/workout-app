const express = require("express");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
var upload = multer({ storage: storage });

const { uploadImage, getImages } = require("../controllers/image");
const router = express.Router();

router.post("/", upload.single("testImage"), uploadImage);

router.get("/", getImages);

module.exports = router;
