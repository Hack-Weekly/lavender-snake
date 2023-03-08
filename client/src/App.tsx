import styled from "@emotion/styled";
import { useEffect, useState } from "react";

interface TodoItemProps {
	isCompleted: boolean;
}

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

const TodoItem = styled.div<TodoItemProps>`
	text-decoration: ${(props) => props.isCompleted ? 'line-through' : 'none'}
`;

const dummyTodos = [
	{
		id: 1,
		text: "Learn React",
		completed: false,
	},
	{
		id: 2,
		text: "Learn TypeScript",
		completed: true,
	},
	{
		id: 3,
		text: "Learn GraphQL",
		completed: false,
	},
];

function App() {
	// TODO: Get data from server
	const [todos, setTodos] = useState(dummyTodos);
	const [input, setInput] = useState("");

	useEffect(()=>{
		console.log(todos);
	},)

	const addTodo = () => {
		const newTodo = {
			id: todos.length + 1,
			text: input,
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	const removeTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const handleCompleted = (completedId: number) => {
		console.log("clicked");
		const newTodos = todos;
		console.log(newTodos);
		newTodos.map(item  => {
			(item.id === completedId) && (item.completed = !item.completed);
		})
		setTodos(newTodos);
	}

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
						<div key={todo.id}>
							{/* TODO: style todo differently when it's completed */}
							<li>
								<TodoItem isCompleted={todo.completed} onClick={() => handleCompleted(todo.id)}>{todo.text}</TodoItem>
							</li>
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
