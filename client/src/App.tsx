import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Todo } from "./types";
import { ApiEndpoints, Context, useApiEndpoint, useTodos } from "./Context";
import { TodoList } from "./components/TodoList";
import Header from "./components/Header";
import Category from "./components/Category";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { colors } from "./colors";
import { css } from "@emotion/react";
import { useApiClient } from "./apiClient";
import { isProd } from "./utils";

const AppContainer = styled.div`
	font-family: "Outfit", sans-serif;
	box-sizing: border-box;
	min-height: 100vh;
`;

const BackgroundImage = styled.img`
	opacity: 0.03;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: auto;
	pointer-events: none;
`;

const MainContent = styled.div`
	min-height: calc(100vh - 5rem);
	display: flex;
	color: #272b33;
`;

const ToggleItem = styled(ToggleGroup.Item)`
	background-color: ${colors.textSecondary};
	padding: 11px;
	border: 0px;
	&[data-state="on"] {
		background-color: ${colors.accent};
	}

	&:first-of-type {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	&:last-child {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
`;

function ApiSelector() {
	const [apiEndpoint, setApiEndpoint] = useApiEndpoint();

	// hide in prod
	if (isProd) {
		return null;
	}

	return (
		<div
			css={{
				position: "absolute",
				bottom: "3rem",
				left: "7rem",
				color: "black",
			}}
		>
			<ToggleGroup.Root
				type="single"
				value={apiEndpoint}
				onValueChange={(sel) => {
					if (sel) setApiEndpoint(sel);
				}}
			>
				<ToggleItem value={ApiEndpoints.Local}>Local API</ToggleItem>
				<ToggleItem value={ApiEndpoints.GCP}>Cloud API</ToggleItem>
			</ToggleGroup.Root>
		</div>
	);
}

function AppContent() {
	const [, setTodos] = useTodos();
	const [input, setInput] = useState("");
	const apiClient = useApiClient();

	const addTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		//add new todo when input isn't blank
		if (input) {
			const newTodo = {
				id: "",
				text: input,
				completed: false,
			};
			const newTodos = await apiClient.addTodo(input);
			// Update local view of todos from the 'master' list from server
			setTodos(newTodos);
			setInput("");
		}
	};

	const handleInput = (newInput: string) => {
		setInput(newInput);
	};

	return (
		<>
			<Header />
			<MainContent>
				<Category />
				<TodoList
					inputValue={input}
					handleInput={handleInput}
					addTodo={addTodo}
				/>
			</MainContent>
			<ApiSelector />
		</>
	);
}

function App() {
	return (
		<AppContainer>
			<BackgroundImage src="./lavender-snake-bg.png" />
			<Context>
				<AppContent />
			</Context>
		</AppContainer>
	);
}

export default App;
