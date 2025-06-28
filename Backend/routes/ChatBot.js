const express = require("express");
const router = express.Router();
const chatController = require("../config/connectChatBot");

router.post("/", chatController.handleChat);

module.exports = router;