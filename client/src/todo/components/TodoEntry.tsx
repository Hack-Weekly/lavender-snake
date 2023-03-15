import { useTodos } from "@/todo/TodoContextProvider";
import styled from "@emotion/styled";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { css } from "@emotion/react";
import { colors } from "@/colors";
import { useApiClient } from "@/apiClient";

interface TodoItemProps {
	isCompleted: boolean;
}

const TodoItemContainer = styled.div`
	min-width: 15rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	font-size: 1.4rem;
	transition: opacity 0.6s ease-out, height 0.4s ease-out;
`;

const TodoItem = styled.div<TodoItemProps>`
	margin-left: 0.5rem;
	color: ${(props) => props.isCompleted && `${colors.textSecondary}`};
	text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
`;
const CheckCircleContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const DeleteButton = styled.div`
	margin-left: auto;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover svg {
		stroke: ${colors.accent};
	}
`;

const TodoStyleNoFade = css`
	opacity: 1;
	height: 3.5rem;
`;

const TodoStyleFadeTriggered = css`
	opacity: 0;
	height: 0px;
	padding: 0px;
	margin: 0px;
`;

function TodoEntry({ todo }: any) {
	const [, setTodos] = useTodos();
	const [isAnimating, setIsAnimating] = useState(false);
	const apiClient = useApiClient();

	const removeTodo = async () => {
		const todos = await apiClient.deleteTodo(todo);
		setTodos(todos);
	};

	const handleCompleted = async () => {
		todo.completed = !todo.completed;
		setTodos((t: any[]) => [...t]); // Assumes this will succeed
		const todos = await apiClient.updateTodo(todo);
		setTodos(todos); // refresh with updated data from server (which should match our local view, in most cases)
	};

	const handleDeleted = () => {
		setIsAnimating(true);
	};

	const handleTransitionEnd = async () => {
		await removeTodo();
		if (isAnimating) {
			setIsAnimating(false);
		}
	};

	return (
		<TodoItemContainer
			key={todo.id}
			css={isAnimating ? TodoStyleFadeTriggered : TodoStyleNoFade}
			onTransitionEnd={handleTransitionEnd}
		>
			<IconContext.Provider value={{ color: colors.accent }}>
				<CheckCircleContainer onClick={() => handleCompleted()}>
					{todo.completed ? <AiFillCheckCircle /> : <BsCircle />}
				</CheckCircleContainer>
			</IconContext.Provider>
			<TodoItem isCompleted={todo.completed}>{todo.text}</TodoItem>
			<IconContext.Provider value={{ color: colors.textSecondary }}>
				<DeleteButton>
					<IoTrashOutline onClick={() => handleDeleted()} />
				</DeleteButton>
			</IconContext.Provider>
		</TodoItemContainer>
	);
}

export default TodoEntry;
