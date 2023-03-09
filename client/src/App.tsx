import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Todo } from "../../shared/types";
import apiClient from "./apiClient";
import { Context, useTodos } from "./Context";
import { TodoList } from "./TodoList";

const AppContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const AppHeader = styled.div`
	display: flex;
	align-items: center;
	height: 60px;
	width: 100%;
	padding-left: 20px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

function AppContent() {
	const [, setTodos] = useTodos();
	const [input, setInput] = useState("");

	const addTodo = async () => {
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

	return (
		<>
			<AppHeader>
				<h1>lavender-snake : TODO LIST</h1>
			</AppHeader>
			<div>
				<input
					placeholder="What needs to be done?"
					value={input}
					onChange={(e) => setInput(e.target.value)}
				/>
				<button onClick={addTodo}>ADD TODO</button>
			</div>
			<TodoList />
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
