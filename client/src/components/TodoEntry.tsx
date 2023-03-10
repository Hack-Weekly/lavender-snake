import { useTodos } from "../Context";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Todo } from "../../../shared/types";
import apiClient from "../apiClient";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { IoTrashOutline,IoTrashSharp } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { css } from "@emotion/react";

interface TodoItemProps {
	isCompleted: boolean;
}

const TodoItemContainer = styled.div`
	min-width: 15rem;
	max-width: 30rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0.5rem 0;
	font-size: 1.4rem;
`;

const TodoItem = styled.div<TodoItemProps>`
	margin-left: 0.5rem;
	color: ${(props) => (props.isCompleted && "#7A7E88")};
	text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
`;

const DeleteButton = styled.div`
	margin-left: auto;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover svg{
		stroke: #61A4D9;
	}
`;

const TodoStyleNoFade = css`
	opacity: 1;
	transition: opacity 0.6s ease-out, height 0.4s ease-out;
	height: auto;
`;

const TodoStyleFadeTriggered = css`
	margin: 0px;
	padding: 0px;
	height: 0px;
	opacity: 0;
`;


function TodoEntry({ todo }: any) {
	const [, setTodos] = useTodos();
	const [isAnimating, setIsAnimating] = useState(false);

	const removeTodo = async () => {
		const todos = await apiClient.deleteTodo(todo);
		setTodos(todos);
	};

	const handleCompleted = async () => {
		const todos = await apiClient.updateTodo({
			...todo,
			completed: !todo.completed,
		});
		setTodos(todos);
	};

	const handleDeleted = () => {
		setIsAnimating(true);

		setTimeout(() => {
			setIsAnimating(false);
			removeTodo();
		}, 800);
	}

	return (
		<TodoItemContainer key={todo.id} css={isAnimating ? [TodoStyleNoFade, TodoStyleFadeTriggered] : TodoStyleNoFade} >
			<IconContext.Provider value={{ color: "#61A4D9" }}>
				{(todo.completed) ? <AiFillCheckCircle/> : <BsCircle/>}
			</IconContext.Provider>
				<TodoItem isCompleted={todo.completed} onClick={() => handleCompleted()}>
					{todo.text}
				</TodoItem>
			<IconContext.Provider value={{ color: "hsl(198, 1%, 29%)" }}>
				<DeleteButton>
					<IoTrashOutline onClick={() => handleDeleted()}/>
				</DeleteButton>
			</IconContext.Provider>
		</TodoItemContainer>
	);
}

export default TodoEntry;