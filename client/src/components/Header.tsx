import styled from "@emotion/styled";

const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	height: 3.5rem;
	padding-left: 1.2rem;
`;

export default function Header() {
	return (
		<HeaderContainer>
			<h1>To Do List by Lavender Snake</h1>
		</HeaderContainer>
	);
}
