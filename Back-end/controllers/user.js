const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { create } = require("../models/User");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

const getUser = async (req, res) => {
  const user = await User.find();
  res.status(200).json({ user });
};

// login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const emptyLoginFields = [];
  if (!email) {
    emptyLoginFields.push("email");
  }
  if (!password) {
    emptyLoginFields.push("password");
  }
  if (emptyLoginFields.length > 0) {
    return res
      .status(400)
      .json({ error: `please enter ${emptyLoginFields}`, emptyLoginFields });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email not registerd" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    const token = createToken(user._id);
    res.status(200).json({
      user,
      token,
      email,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

//signup
const signUpUser = async (req, res) => {
  const { email, password, repeatPassword } = req.body;
  emptyFields = [];

  if (!email) {
    emptyFields.push("email");
  }
  if (!password) {
    emptyFields.push("password");
  }
  if (!repeatPassword) {
    emptyFields.push("repeatPassword");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: `please enter ${emptyFields}`, emptyFields });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({
      error: "Email already in use",
    });
  }

  if (!repeatPassword) {
    return res.status(400).json({
      error: "enter repeat Password!",
    });
  }
  if (password !== repeatPassword) {
    return res.status(400).json({
      error: "passwords must match!",
    });
  }

  /*if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error: "Password is not strong enough",
    });
  }*/
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "invalid Email!",
    });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hash,
      repeatPassword: hash,
    });

    const token = createToken(user._id);

    res.status(200).json({
      email,
      token,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  loginUser,
  signUpUser,
  getUser,
};
