const express = require("express");
const router = express.Router();

// Store in memory for now
const todos = [
	{
		id: 1,
		text: "Learn React",
		completed: false,
	},
	{
		id: 2,
		text: "Learn TypeScript",
		completed: true,
	},
	{
		id: 3,
		text: "Learn GraphQL",
		completed: false,
	},
];

router.get("/", function (req, res, next) {
	// TODO - return all todos
	res.json({ todos });
});

module.exports = router;
