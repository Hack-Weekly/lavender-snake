import { useTodos } from "../Context";
import styled from "@emotion/styled";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { BsCircle } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { IconContext } from "react-icons/lib";
import { css, keyframes } from "@emotion/react";
import { colors } from "../colors";
import { useApiClient } from "../apiClient";

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
	position: relative;
	color: ${(props) => props.isCompleted && `${colors.textSecondary}`};
`;
const LineThrough = styled.div<TodoItemProps>`
	${(props) => (props.isCompleted) && 
		`&:before{
			content: "";
			position: absolute;
			display: block;
			width: 100%;
			height: 0.15rem;
			top: 0.7rem;
			background: ${colors.textSecondary};
		}
		`
	}
`
const lineThrough = keyframes`
	from {
		content: "";
		position: absolute;
		display: block;
		width: 0%;
		height: 0.15rem;
		top: 0.7rem;
		background: ${colors.textSecondary};
	}
	to {
		content: "";
		position: absolute;
		display: block;
		width: 100%;
		height: 0.15rem;
		top: 0.7rem;
		background: ${colors.textSecondary};
	}
`
const move = keyframes`
	0%{
		padding-left: 0;
	}
	70%{
		padding-left: 0;
	}
	85%{
		padding-left: 0.15rem;
	}
	100% {
		padding-left: 0;
	}
`
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
	const [isLineThroughAnimating, setIsLineThroughAnimating] = useState(false);
	const apiClient = useApiClient();

	const removeTodo = async () => {
		const todos = await apiClient.deleteTodo(todo);
		setTodos(todos);
	};

	const completeTodo = async () => {
		const todos = await apiClient.updateTodo({
			...todo,
			completed: !todo.completed,
		});
		setTodos(todos);
	};

	const handleCompleted = () => {
		setIsLineThroughAnimating(true);
		console.log("completed");
	}
	const handleLineThroughTransitionEnd = async () => {
		await completeTodo();
		if(isLineThroughAnimating) {
			setIsLineThroughAnimating(false);
		}
	} 

	const handleDeleted = () => {
		setIsAnimating(true);
	};

	const handleTransitionEnd = async () => {
		console.log("transition ended");
		
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
			<TodoItem 
				isCompleted={todo.completed}
				css={ isLineThroughAnimating && css`animation: ${move} 0.6s ease;}`}
				onTransitionEnd={handleLineThroughTransitionEnd}
			>
				<LineThrough 
					isCompleted={todo.completed}
					css={ isLineThroughAnimating && css`animation: ${lineThrough} 0.4s ease;}`}
				/>
				{todo.text}
			</TodoItem>
			<IconContext.Provider value={{ color: colors.textSecondary }}>
				<DeleteButton>
					<IoTrashOutline onClick={() => handleDeleted()} />
				</DeleteButton>
			</IconContext.Provider>
		</TodoItemContainer>
	);
}

export default TodoEntry;
