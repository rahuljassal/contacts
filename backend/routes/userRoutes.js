const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUsers,
  getCurrentUser,
  getUsers,
} = require("../controllers/userControllers");
const tokenHandler = require("../middlewares/tokenHandler");
router.get("/", getUsers);
router.post("/register", registerUser);

router.post("/login", loginUsers);
router.get("/current", tokenHandler, getCurrentUser);

module.exports = router;
