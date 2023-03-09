import { useTodos } from "../Context";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Todo } from "../../../shared/types";
import apiClient from "../apiClient";
import TodoEntry from "./TodoEntry";

const TodoContainer = styled.div`
	display: flex;
	flex-direction: column;
	// align-items: center;
	// justify-content: center;
	flex: 1;
	padding: 2rem 3rem;
`;
const TodoListHeader = styled.div`
	align-self: flex-start;
	font-size: 1.7rem;
	color: #61A4D9;
`
const AddItemInput = styled.div`
	display: flex;
	font-size: 1.2rem;
	& input{
		width: 20rem;
		box-sizing: border-box;
		background-color: transparent;
		margin-top: 1rem;
		padding: 0.7rem;
		border: solid 3px transparent;
		border-bottom: groove 3px #0f0f0f40;
	}
	& button {
		padding: 0;
		border: none;
		padding-bottom: 0.15rem;
		border-radius: 5px;
		background-color: #0f0f0f40;
		cursor: pointer;
		& span {
			background: #f1f5f8;
			display: block;
			padding: 0.5rem 1rem;
			border-radius: 5px;
			border: 1px solid hsl(198, 1%, 29%);
		}
		& span:hover{
			color: #fff;
			background: #61A4D9;
		}
	}
	& button:hover{
		padding-bottom: 0px;
	}
`
const todoEntriesConatiner = {
	margin: "1rem 0"
}

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
				<button type="submit"><span>Add</span></button>
			</form>
		</AddItemInput>
	);
}

export function TodoList(props: InputProps) {
	const [todos] = useTodos();

	if (todos === undefined) {
		return <div>"Loading..."</div>;
	}

	return (
		<TodoContainer>
			<TodoListHeader>List 2</TodoListHeader>
			<AddItem inputValue={props.inputValue} handleInput={props.handleInput} addTodo={props.addTodo}/>
			<div style={todoEntriesConatiner}>
				{todos.map((todo) => (
					<TodoEntry key={todo.id} todo={todo} />
				))}
			</div>
		</TodoContainer>
	);
}
