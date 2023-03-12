import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiClient } from "./apiClient";
import { Todo } from "./types";

const TodoContext = createContext<[Todo[] | undefined, any]>([[], () => {}]);
export const useTodos = () => useContext(TodoContext);

export const ApiEndpoints = {
	GCP: "https://lavender-snake-server-wgikiljsnq-uc.a.run.app",
	Local: "http://localhost:3000",
};

const ApiEndpointContext = createContext<[string, any]>([
	ApiEndpoints.GCP,
	() => {},
]);
export const useApiEndpoint = () => useContext(ApiEndpointContext);

function TodoContextProvider({ children }: any) {
	const [todos, setTodos] = useState<Todo[] | undefined>(undefined);
	const apiClient = useApiClient();
	useEffect(() => {
		(async () => {
			const t = await apiClient.getTodos();
			setTodos(t);
		})();
	}, [apiClient]);

	return (
		<TodoContext.Provider value={[todos, setTodos]}>
			{children}
		</TodoContext.Provider>
	);
}
export function Context({ children }: any) {
	const [apiEndpoint, setApiEndpoint] = useState(ApiEndpoints.GCP);

	return (
		<GoogleOAuthProvider clientId="987357728284-k763p5d1paujmlvn83tl2lc637f8ofc3.apps.googleusercontent.com">
			<ApiEndpointContext.Provider value={[apiEndpoint, setApiEndpoint]}>
				<TodoContextProvider>{children}</TodoContextProvider>
			</ApiEndpointContext.Provider>
		</GoogleOAuthProvider>
	);
}
