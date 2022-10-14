const express = require("express");
const { authenticate } = require("./middleware/authenticate");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/alive", authenticate(), (req, res) => {
  res.status(200).json({ message: "Session token is alive" });
});

module.exports = router;
