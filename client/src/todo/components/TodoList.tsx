import { useTodos } from "@/todo/TodoContextProvider";
import { useUser } from "@/Context";
import styled from "@emotion/styled";
import TodoEntry from "./TodoEntry";
import { colors } from "@/branding";

const TodoContainer = styled.div`
	display: flex;
	gap: 1rem;
	max-width: 48rem;
	flex-direction: column;
	flex: 1;
	padding: 2rem 3rem;
	color: ${colors.textPrimary};
`;
const LoadingTodos = styled.div`
	padding: 2rem 3rem;
	color: ${colors.textPrimary};
	font-size: 2em;
`;
const TodoListHeader = styled.div`
	align-self: flex-start;
	font-size: 2rem;
	color: ${colors.accent};
`;
const AddItemInput = styled.div`
	display: flex;
	font-size: 1.2rem;
	flex-direction: row;
	& form {
		display: flex;
		gap: 2rem;
		flex: 1;
	}
	& input {
		flex: 1;
		box-sizing: border-box;
		background-color: transparent;
		padding: 0.7rem;
		border: solid 3px transparent;
		border-bottom: groove 2px ${colors.accent};
		color: ${colors.textPrimary};
	}
	& input:focus {
		outline: none;
		ring: none;
		box-shadow: 0 0 0 1px ${colors.accent};
	}
	& button {
		border: 1px solid ${colors.accent};
		background-color: ${colors.accent};
		color: ${colors.bgPrimary};
		border-radius: 5px;
		cursor: pointer;
		padding-left: 1rem;
		padding-right: 1rem;
	}
	& button:hover {
		background-color: ${colors.bgPrimary};
		color: ${colors.accent};
	}
`;
const TodoEntriesContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

interface InputProps {
	inputValue: string;
	handleInput: any;
	addTodo: any;
}

function AddItem(props: InputProps) {
	return (
		<AddItemInput>
			<form onSubmit={props.addTodo}>
				<input
					placeholder="What needs to be done?"
					value={props.inputValue}
					onChange={(e) => props.handleInput(e.target.value)}
				/>
				<button type="submit">Add</button>
			</form>
		</AddItemInput>
	);
}

export function TodoList(props: InputProps) {
	const [todos] = useTodos();
	const [user] = useUser();

	if (!user) {
		return <LoadingTodos>Log in to begin!</LoadingTodos>;
	}

	if (todos === undefined) {
		return <LoadingTodos>Loading...</LoadingTodos>;
	}

	return (
		<TodoContainer>
			<TodoListHeader>Welcome, {user.given_name}!</TodoListHeader>
			<AddItem
				inputValue={props.inputValue}
				handleInput={props.handleInput}
				addTodo={props.addTodo}
			/>
			<TodoEntriesContainer>
				{todos.map((todo) => (
					<TodoEntry key={todo.id} todo={todo} />
				))}
			</TodoEntriesContainer>
		</TodoContainer>
	);
}
