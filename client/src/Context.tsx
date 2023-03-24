import { GoogleOAuthProvider } from "@react-oauth/google";
import { createContext, useContext, useState } from "react";
import { isProd } from "./utils";
import { ClientUser } from "shared/userTypes";

interface ApiEndpoint {
	name: string;
	http: string;
	ws: string;
}
export const ApiEndpoints = {
	GCP: {
		name: "GCP",
		http: "https://lavender-snake-server-wgikiljsnq-uc.a.run.app",
		ws: "wss://lavender-snake-server-wgikiljsnq-uc.a.run.app/ws",
	},
	Local: {
		name: "Local",
		http: "http://localhost:3000",
		ws: "ws://localhost:3000/ws",
	},
};

const ApiEndpointContext = createContext<[ApiEndpoint, any]>([
	ApiEndpoints.GCP,
	() => {},
]);
export const useApiEndpoint = () => useContext(ApiEndpointContext);

export const testUser: ClientUser = {
	jwt: "TestUserJWT",
	userData: {
		id: "testuserid",
		name: "Test User",
		picture: "my picture",
	},
};
const UserContext = createContext<[ClientUser | undefined, any]>([
	undefined,
	() => {},
]);
export const useUser = () => useContext(UserContext);

function UserContextProvider({ children }: any) {
	const userState = useState<ClientUser | undefined>(undefined);
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
