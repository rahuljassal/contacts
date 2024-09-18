const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  res.json({ message: "user registered successfully" });
});

router.post("/login", (req, res) => {
  res.json({ message: "user logged in successfully" });
});
router.get("/current", (req, res) => {
  res.json({ message: "current user info " });
});
module.exports = router;
