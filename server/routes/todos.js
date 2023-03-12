const { v4: uuidv4 } = require("uuid");
const express = require("express");
const router = express.Router();
const storageClient = require("../storageClient");

router.get("/", async function (req, res, next) {
	const todos = await storageClient.load(req.user.userData.id);
	res.json({ todos });
});

router.post("/", async function (req, res, next) {
	const newTodo = {
		id: uuidv4(),
		text: req.body.text,
		completed: false,
	};

	console.log(newTodo);
	const oldTodos = await storageClient.load(req.user.userData.id);
	const newTodos = [...oldTodos, newTodo];
	await storageClient.save(req.user.userData.id, newTodos);
	res.json({ todos: newTodos });
});

router.delete("/", async function (req, res, next) {
	const id = req.body.id;

	console.log(id);
	const oldTodos = await storageClient.load(req.user.userData.id);
	const newTodos = oldTodos.filter((todo) => todo.id !== id);
	await storageClient.save(req.user.userData.id, newTodos);
	res.json({ todos: newTodos });
});

router.put("/", async function (req, res, next) {
	const { id, text, completed } = req.body;

	const oldTodos = await storageClient.load(req.user.userData.id);
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
	await storageClient.save(req.user.userData.id, newTodos);
	res.json({ todos: newTodos });
});

module.exports = router;
