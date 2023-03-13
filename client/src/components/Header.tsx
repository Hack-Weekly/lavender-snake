import styled from "@emotion/styled";
import { useGoogleLogin } from "@react-oauth/google";
import { colors } from "../colors";
import { ApiEndpoints, useApiEndpoint, useUser } from "../Context";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1.5rem;
	height: 6rem;
	padding: 0 1.2rem;
	@media (max-width: 660px) {
		flex-direction: column;
	}
`;

const Button = styled.button`
	padding: 20px;
	border-radius: 10px;
	border: none;
	background-color: ${colors.accent};
	cursor: pointer;
`;

const Spacer = styled.div`
	flex: 100;
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
		<Button onClick={user ? logout : login}>{user ? "Logout" : "Login"}</Button>
	);
}

export default function Header() {
	return (
		<HeaderContainer>
			<Spacer />
			<h1
				css={{
					fontSize: "6em",
					margin: 0,
				}}
			>
				ToDo
			</h1>
			<div
				css={{
					fontSize: "1.6em",
					transform: "translate(-50px, -18px) ",
					color: colors.textSecondary,
				}}
			>
				<span css={{ fontSize: ".8em" }}>by</span> Lavender Snake
			</div>
			<Spacer />
			<LoginButton />
		</HeaderContainer>
	);
}
