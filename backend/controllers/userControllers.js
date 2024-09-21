const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const userModels = require("../models/userModels");
const jwt = require("jsonwebtoken");
const accessSecret = process.env.ACCESS_TOKEN;
// @desc register a user
// @route post /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  console.log("req.body :>> ", req.body);
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await userModels.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModels.create({
    username,
    email,
    password: hashedPassword,
  });
  if (user) {
    res.status(201).json({ _id: user._id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "user registered successfully" });
});

// @desc login user
// @route POST /api/users/login
// @access public
const loginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await userModels.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      accessSecret,
      { expiresIn: "10m" }
    );
    res.status(200).json({ access_token: accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});
// @desc get current user
// @route GET /api/users/current
// @access public
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});
// @desc Get All user
// @route GET /api/users
// @access public
const getUsers = asyncHandler(async (req, res) => {
  const users = await userModels.find();
  res.status(200).json(users);
});
module.exports = {
  registerUser,
  loginUsers,
  getCurrentUser,
  getUsers,
};
