import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useEffect, useState } from "react";
import { useApiClient } from "./apiClient";
import { Todo } from "./types";
import { isProd } from "./utils";

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

export interface User {
	authCode: string;
	email: string;
	family_name: string;
	given_name: string;
	id: string;
	locale: string;
	name: string;
	picture: string;
	verified_email: boolean;
}

const testUser: User = {
	authCode: "tester",
	email: "tester@tester.com",
	family_name: "Qa",
	given_name: "Tester",
	id: "tester",
	locale: "en-US",
	name: "Tester Qa",
	picture: "none",
	verified_email: false,
};
const UserContext = createContext<[User | undefined, any]>([
	undefined,
	() => {},
]);
export const useUser = () => useContext(UserContext);

function TodoContextProvider({ children }: any) {
	const [todos, setTodos] = useState<Todo[] | undefined>(undefined);
	const apiClient = useApiClient();
	useEffect(() => {
		if (!apiClient.user) return;
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
function UserContextProvider({ children }: any) {
	const userState = useState<User | undefined>(undefined);
	const [apiEndpoint] = useApiEndpoint();

	return (
		<UserContext.Provider
			value={
				apiEndpoint === ApiEndpoints.GCP ? userState : [testUser, () => {}]
			}
		>
			{children}
		</UserContext.Provider>
	);
}
export function Context({ children }: any) {
	const [apiEndpoint, setApiEndpoint] = useState(
		isProd ? ApiEndpoints.GCP : ApiEndpoints.Local
	);

	return (
		<GoogleOAuthProvider clientId="987357728284-k763p5d1paujmlvn83tl2lc637f8ofc3.apps.googleusercontent.com">
			<ApiEndpointContext.Provider value={[apiEndpoint, setApiEndpoint]}>
				<UserContextProvider>
					<TodoContextProvider>{children}</TodoContextProvider>
				</UserContextProvider>
			</ApiEndpointContext.Provider>
		</GoogleOAuthProvider>
	);
}
