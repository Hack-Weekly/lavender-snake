import styled from "@emotion/styled";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 3.5rem;
	padding-left: 1.2rem;
	padding-right: 1.2rem;
`;

export default function Header() {
	return (
		<HeaderContainer>
			<img src="/lavender-snake.png" alt="logo" width="60" height="60" />
			<h1>To Do List by Lavender Snake</h1>
		</HeaderContainer>
	);
}
