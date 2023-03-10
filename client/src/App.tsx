import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Todo } from "../types";
import apiClient from "./apiClient";
import { Context, useTodos } from "./Context";
import { TodoList } from "./components/TodoList";
import Header from "./components/Header";
import Category from "./components/Category";

const AppContainer = styled.div`
	font-family: "Outfit", sans-serif;
	box-sizing: border-box;
	min-height: 100vh;
`;

const MainContent = styled.div`
	min-height: calc(100vh - 4rem);
	display: flex;
	color: #272b33;
`;

function AppContent() {
	const [, setTodos] = useTodos();
	const [input, setInput] = useState("");

	const addTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const newTodo = {
			id: "",
			text: input,
			completed: false,
		};
		const newTodos = await apiClient.addTodo(input);
		// Update local view of todos from the 'master' list from server
		setTodos(newTodos);
		setInput("");
	};

	const handleInput = (newInput: string) => {
		setInput(newInput);
	};

	return (
		<>
			<Header />
			<MainContent>
				<Category></Category>
				<TodoList
					inputValue={input}
					handleInput={handleInput}
					addTodo={addTodo}
				/>
			</MainContent>
		</>
	);
}

function App() {
	return (
		<AppContainer>
			<Context>
				<AppContent />
			</Context>
		</AppContainer>
	);
}

export default App;
