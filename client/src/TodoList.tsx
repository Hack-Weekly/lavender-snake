import { useTodos } from "./Context";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Todo } from '../../shared/types'
import apiClient from "./apiClient";


const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
	justify-content: center;
	flex: 1;
`;

interface TodoItemProps {
	isCompleted: boolean;
}

const TodoItem = styled.div<TodoItemProps>`
	text-decoration: ${(props) => props.isCompleted ? 'line-through' : 'none'}
`;

function TodoEntry({todo} : any) {
	const [, setTodos] = useTodos();
    const removeTodo = async () => {
		const todos = await apiClient.deleteTodo(todo);
		setTodos(todos);
	};

	const handleCompleted = () => {};

    return <div key={todo.id}>
        <TodoItem isCompleted={todo.completed} onClick={() => handleCompleted()}>{todo.text}</TodoItem>
    <button onClick={() => removeTodo()}>DELETE</button>
</div>
}
export function TodoList() {
    const [todos] = useTodos();

    if (todos === undefined) {
        return <div>"Loading..."</div>;
    }

    return <TodoContainer>
      			<ul>
					{todos.map((todo) => <TodoEntry key={todo.id} todo={todo} />)}
				</ul>
				<div>
					TODO COUNT: <span>{todos.length}</span>
				</div>
    </TodoContainer>
}