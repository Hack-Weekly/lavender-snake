import styled from "@emotion/styled";
import { useGoogleLogin } from "@react-oauth/google";
import { ApiEndpoints, useUser } from "../Context";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1.5rem;
	height: 5rem;
	padding: 0 1.2rem;
`;

export default function Header() {
	const [user, setUser] = useUser();
	const googleLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			console.log(codeResponse);
			const tokenResp = await fetch(`${ApiEndpoints.Local}/auth/google`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					code: codeResponse.code,
				}),
			});

			const tokens = await tokenResp.json();
			console.log(tokens);
			setUser(tokens);
		},
	});

	const login = () => googleLogin();
	const logout = () => setUser(undefined);

	return (
		<HeaderContainer>
			<img src="/lavender-snake.png" alt="logo" width="90" height="90" />
			<h1>To Do List by Lavender Snake</h1>
			<button onClick={user ? logout : login}>
				{user ? "Logout" : "Login"}
			</button>
		</HeaderContainer>
	);
}
