import { useTodos } from "../Context";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Todo } from "../../../shared/types";
import apiClient from "../apiClient";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { IoTrashOutline,IoTrashSharp } from "react-icons/io5";
import { IconContext } from "react-icons/lib";

interface TodoItemProps {
	isCompleted: boolean;
}

const TodoItemContainer = styled.div`
	min-width: 15rem;
	max-width: 30rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0.4rem 0;
	font-size: 1.3rem;
`

const TodoItem = styled.div<TodoItemProps>`
	margin-left: 0.5rem;
	text-decoration: ${(props) => (props.isCompleted ? "line-through" : "none")};
`;
const DeleteButton = styled.div`
	margin-left: auto;
	cursor: pointer;
`

function TodoEntry({ todo }: any) {
	const [, setTodos] = useTodos();
	const removeTodo = async () => {
		const todos = await apiClient.deleteTodo(todo);
		setTodos(todos);
	};

	const handleCompleted = () => {};

	return (
		<TodoItemContainer key={todo.id}>
			<IconContext.Provider value={{ color: "#61A4D9" }}>
				{(todo.completed) ? <AiFillCheckCircle/> : <BsCircle/>}
				<TodoItem isCompleted={todo.completed} onClick={() => handleCompleted()}>
					{todo.text}
				</TodoItem>
				<DeleteButton>
					<IoTrashOutline onClick={() => removeTodo()}/>
				</DeleteButton>
			</IconContext.Provider>
		</TodoItemContainer>
	);
}

export default TodoEntry;