const express = require("express");
const Image = require("../models/Image");

const uploadImage = async (req, res) => {
  let obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: req.file.filename,
      contentType: "image/png",
    },
  };

  try {
    await Image.create(obj);
    res.status(201).json({
      message: "upload successful",
    });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const getImages = async (req, res) => {
  const img = await Image.find({});
  if (!img) {
    res.status(404).json({
      error: "img not found",
    });
  }
  try {
    res.status(200).json({
      img,
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: error.message,
    });
  }
};

module.exports = {
  getImages,
  uploadImage,
};
