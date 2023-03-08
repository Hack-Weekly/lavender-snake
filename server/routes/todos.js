const express = require("express");
const router = express.Router();

// Store in memory for now
const todos = [];

router.get("/", function (req, res, next) {
	// TODO - return all todos
	res.json({ todos });
});

module.exports = router;
