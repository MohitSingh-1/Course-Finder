const express = require("express");
const router = express.Router();

const {chatController} = require("../controllers/AI_Search");

router.post("/ai",chatController);

module.exports = router;
