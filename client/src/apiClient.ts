import { useMemo } from "react";
import { useApiEndpoint, User, useUser } from "./Context";
import { Todo } from "./types";

export class ApiClientBase {
	endpoint: string;
	user: User | undefined;
	subPath: string;
	constructor(endpoint: string, subPath: string, user: User | undefined) {
		this.endpoint = endpoint;
		this.subPath = subPath;
		this.user = user;
	}

	protected async request(
		path: string = this.subPath,
		options: RequestInit = {}
	) {
		const resp = await fetch(`${this.endpoint}/${path}`, {
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: this.user ? `Bearer ${this.user.jwt}` : "",
			}),
			...options,
		});
		return await resp.json();
	}

	protected async get(
		path: string = this.subPath,
		options: RequestInit = { method: "GET" }
	) {
		return await this.request(path, options);
	}
	async post(o: any) {
		return await this.request(this.subPath, {
			method: "POST",
			body: JSON.stringify(o),
		});
	}
	protected async put(o: any) {
		return await this.request(this.subPath, {
			method: "PUT",
			body: JSON.stringify(o),
		});
	}
	protected async delete(o: any) {
		return await this.request(this.subPath, {
			method: "DELETE",
			body: JSON.stringify(o),
		});
	}
}
class ApiClient extends ApiClientBase {
	constructor(endpoint: string, user: User | undefined) {
		super(endpoint, "todos", user);
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
