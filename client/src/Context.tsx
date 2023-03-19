import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useState } from "react";
import { isProd } from "./utils";

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
	jwt: string;
	name: string;
	picture: string;
}

export const testUser: User = {
	jwt: "TestUserJWT",
	name: "Test User",
	picture: "my picture",
};
const UserContext = createContext<[User | undefined, any]>([
	undefined,
	() => {},
]);
export const useUser = () => useContext(UserContext);

function UserContextProvider({ children }: any) {
	const userState = useState<User | undefined>(undefined);
	const [apiEndpoint] = useApiEndpoint();

	return (
		<UserContext.Provider
			value={
				apiEndpoint === ApiEndpoints.GCP ? userState : userState // [testUser, () => {}]
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
				<UserContextProvider>{children}</UserContextProvider>
			</ApiEndpointContext.Provider>
		</GoogleOAuthProvider>
	);
}
