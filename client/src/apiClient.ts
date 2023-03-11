import { useMemo } from "react";
import { useApiEndpoint } from "./Context";
import { Todo } from "./types";

class ApiClient {
	endpoint: string;
	constructor(endpoint: string) {
		this.endpoint = endpoint;
	}

	async getTodos() {
		const resp = await fetch(`${this.endpoint}/todos`);
		const j = await resp.json();
		return j.todos;
	}

	async addTodo(text: string) {
		const resp = await fetch(`${this.endpoint}/todos`, {
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
		const resp = await fetch(`${this.endpoint}/todos`, {
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
		const resp = await fetch(`${this.endpoint}/todos`, {
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

export function useApiClient() {
	const endpoint = useApiEndpoint()[0];
	return useMemo(() => new ApiClient(endpoint), [endpoint]);
}
