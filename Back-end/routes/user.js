const express = require("express");

const { loginUser, signUpUser, getUser } = require("../controllers/user");
const router = express.Router();

// login route

router.post("/login", loginUser);

router.get("/", getUser);

//signup route
router.post("/signup", signUpUser);

module.exports = router;
