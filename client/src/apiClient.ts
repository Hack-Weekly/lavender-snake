import { useMemo } from "react";
import { useApiEndpoint, User, useUser } from "./Context";
import { Todo } from "./types";

class ApiClient {
	endpoint: string;
	user: User | undefined;
	constructor(endpoint: string, user: User | undefined) {
		this.endpoint = endpoint;
		this.user = user;
	}

	async request(path: string = "todos", options: RequestInit = {}) {
		const resp = await fetch(`${this.endpoint}/${path}`, {
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.user ? `${this.user.authCode}` : "",
			}),
			...options,
		});
		return await resp.json();
	}

	async get(path: string = "todos", options: RequestInit = { method: "GET" }) {
		return await this.request(path, options);
	}
	async post(o: any) {
		return await this.request("todos", {
			method: "POST",
			body: JSON.stringify(o),
		});
	}
	async put(o: any) {
		return await this.request("todos", {
			method: "PUT",
			body: JSON.stringify(o),
		});
	}
	async delete(o: any) {
		return await this.request("todos", {
			method: "DELETE",
			body: JSON.stringify(o),
		});
	}

	async getTodos() {
		return (await this.get()).todos;
	}

	async addTodo(text: string) {
		return (await this.post({ text })).todos;
	}

	async deleteTodo(todo: Todo) {
		return (await this.delete(todo)).todos;
	}

	async updateTodo(todo: Todo) {
		return (await this.put(todo)).todos;
	}
}

export function useApiClient() {
	const endpoint = useApiEndpoint()[0];
	const [user] = useUser();
	return useMemo(() => new ApiClient(endpoint, user), [endpoint, user]);
}
