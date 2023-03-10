import styled from "@emotion/styled";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: start;
	gap: 1.5rem;
	height: 4rem;
	padding: 0 1.2rem;
`;

export default function Header() {
	return (
		<HeaderContainer>
			<img src="/lavender-snake.png" alt="logo" width="60" height="60" />
			<h1>To Do List by Lavender Snake</h1>
		</HeaderContainer>
	);
}
