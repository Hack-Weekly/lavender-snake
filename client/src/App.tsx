import styled from "@emotion/styled";
import { useState } from "react";

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

const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
	flex: 1;
`;

const dummyTodos = [
	{
		id: 1,
		text: "Learn React",
	},
	{
		id: 2,
		text: "Learn TypeScript",
	},
	{
		id: 3,
		text: "Learn GraphQL",
	},
];

function App() {
	const [todos, setTodos] = useState(dummyTodos);
	const [input, setInput] = useState("");

	const addTodo = () => {
		const newTodo = {
			id: todos.length + 1,
			text: input,
		};
		setTodos([...todos, newTodo]);
	};

	const removeTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	return (
		<AppContainer>
			<AppHeader>
				<h1>lavender-snake : TODO LIST</h1>
			</AppHeader>
			<TodoContainer>
				<div>
					<input
						placeholder="What needs to be done?"
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
					<button onClick={addTodo}>ADD TODO</button>
				</div>
				<ul>
					{todos.map((todo) => (
						<div>
							<li key={todo.id}>{todo.text}</li>
							<button onClick={() => removeTodo(todo.id)}>DELETE</button>
						</div>
					))}
				</ul>
				<div>
					TODO COUNT: <span>{todos.length}</span>
				</div>
			</TodoContainer>
		</AppContainer>
	);
}

export default App;
