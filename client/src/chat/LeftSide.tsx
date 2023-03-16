import styled from "@emotion/styled";

const LeftSideContainer = styled.div({
	minWidth: "25vh", // TODO: I think this is wrong
	display: "flex",
	flexDirection: "column",
});

function AppHeader() {
	return <div css={{ margin: "3em 1em" }}>App header</div>;
}

function SearchBox() {
	return (
		<div>
			<input type="text" />
		</div>
	);
}

function ChatList() {
	return <div></div>;
}

export function LeftSide() {
	return (
		<LeftSideContainer>
			<AppHeader />
			<SearchBox />
			<ChatList />
		</LeftSideContainer>
	);
}
