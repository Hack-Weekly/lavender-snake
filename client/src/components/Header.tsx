import styled from "@emotion/styled";
import { useGoogleLogin } from "@react-oauth/google";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1.5rem;
	height: 5rem;
	padding: 0 1.2rem;
`;

export default function Header() {
	const googleLogin = useGoogleLogin({
		flow: "auth-code",
		onSuccess: async (codeResponse) => {
			console.log(codeResponse);
		},
	});
	return (
		<HeaderContainer>
			<img src="/lavender-snake.png" alt="logo" width="90" height="90" />
			<h1>To Do List by Lavender Snake</h1>
			<button onClick={() => googleLogin()}>Login</button>
		</HeaderContainer>
	);
}
