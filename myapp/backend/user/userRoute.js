const express = require("express");
const router = express.Router();
const User = require("../models/user.model.js");

//Get all users information
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (e) {
    res.json({ message: e });
  }
});

//Create the new user data
router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get user info by ID
router.get("/:userID", async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    res.json(user);
  } catch (e) {
    res.json({ message: e });
  }
});

//delete user info by ID
router.delete("/:userID", async (req, res) => {
  try {
    const removedUser = await User.remove({ _id: req.params.userID });
    res.json(removedUser);
  } catch (e) {
    res.json({ message: e });
  }
});

module.exports = router;
