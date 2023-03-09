const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const storageClient = require("../storageClient");

router.get("/", function (req, res, next) {
	const todos = storageClient.load("todos");
	res.json({ todos });
});

router.post("/", function (req, res, next) {
	const newTodo = {
		id: uuidv4(),
		text: req.body.text,
		completed: false,
	};

	console.log(newTodo);
	const oldTodos = storageClient.load("todos");
	const newTodos = [...oldTodos, newTodo];
	storageClient.save("todos", newTodos);
	res.json({ todos: newTodos });
});

router.delete("/", function (req, res, next) {
	const id = req.body.id;

	console.log(id);
	const oldTodos = storageClient.load("todos");
	const newTodos = oldTodos.filter((todo) => todo.id !== id);
	storageClient.save("todos", newTodos);
	res.json({ todos: newTodos });
});

router.put("/", function (req, res, next) {
	const { id, text, completed } = req.body;

	const oldTodos = storageClient.load("todos");
	const newTodos = oldTodos.map((todo) => {
		if (todo.id === id) {
			return {
				...todo,
				text,
				completed,
			};
		}
		return todo;
	});
	storageClient.save("todos", newTodos);
	res.json({ todos: newTodos });
});

module.exports = router;
