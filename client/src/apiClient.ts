import { Todo } from "../../shared/types";

class ApiClient {
	constructor() {}

	async getTodos() {
		const resp = await fetch("http://localhost:3000/todos");
		const j = await resp.json();
		return j.todos;
	}

	async addTodo(text: string) {
		const resp = await fetch("http://localhost:3000/todos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				text: text,
			}),
		});
		const j = await resp.json();
		return j.todos;
	}

	async deleteTodo(todo: Todo) {
		const resp = await fetch("http://localhost:3000/todos", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		const j = await resp.json();
		return j.todos;
	}

	async updateTodo(todo: Todo) {
		const resp = await fetch("http://localhost:3000/todos", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(todo),
		});
		const j = await resp.json();
		return j.todos;
	}
}

export default new ApiClient();
