import { useTodos } from "./TodoContextProvider";
import React, { useState } from "react";
import { useApiClient } from "@/apiClient";
import Header from "@/components/Header";
import Category from "@/components/Category";
import { TodoList } from "./components/TodoList";
import { MainContent } from "@/styles/shared";
import ApiSelector from "@/ApiSelector";
import { TodoContextProvider } from "./TodoContextProvider";


// maybe do better naming for the root app components instead of <name>AppContent?
export function TodoAppContent() {
	const [, setTodos] = useTodos();
	const [input, setInput] = useState("");
	const apiClient = useApiClient();

	const addTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		//add new todo when input isn't blank
		if (input) {
			const newTodo = {
				id: "",
				text: input,
				completed: false
			};
			const newTodos = await apiClient.addTodo(input);
			// Update local view of todos from the 'master' list from server
			setTodos(newTodos);
			setInput("");
		}
	};

	const handleInput = (newInput: string) => {
		setInput(newInput);
	};

	return (
		<>
			<TodoContextProvider>
			<Header />
			<MainContent>
				<Category />
				<TodoList
					inputValue={input}
					handleInput={handleInput}
					addTodo={addTodo}
				/>
			</MainContent>
			<ApiSelector />
			</TodoContextProvider>
		</>
	);
}
