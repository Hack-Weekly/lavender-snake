import styled from "@emotion/styled";
import { useGoogleLogin } from "@react-oauth/google";
import { ApiEndpoints, useApiEndpoint, useUser } from "../Context";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1.5rem;
	height: 5rem;
	padding: 0 1.2rem;
`;

function LoginButton() {
	const [user, setUser] = useUser();
	const [apiEndpoint] = useApiEndpoint();
	const googleLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			const tokenResp = await fetch(`${apiEndpoint}/auth/google`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: codeResponse.code,
				}),
			});

			const tokens = await tokenResp.json();
			setUser(tokens);
		},
	});

	const login = () => googleLogin();
	const logout = () => setUser(undefined);

	if (apiEndpoint === ApiEndpoints.Local) {
		return null;
	}

	return (
		<button onClick={user ? logout : login}>{user ? "Logout" : "Login"}</button>
	);
}

export default function Header() {
	return (
		<HeaderContainer>
			<img src="/lavender-snake.png" alt="logo" width="90" height="90" />
			<h1>To Do List by Lavender Snake</h1>
			<LoginButton />
		</HeaderContainer>
	);
}
