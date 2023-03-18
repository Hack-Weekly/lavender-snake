import styled from "@emotion/styled";
import { FC } from "react";
import { ThreadSummary } from "../../../../shared/chatTypes";
import { useContacts, useThreads } from "../ChatContext";

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

const ThreadComp: FC<{ thread: ThreadSummary }> = ({ thread }) => {
	const contacts = useContacts();
	const participants = thread.participants.map((p) =>
		contacts?.find((c) => c.id === p)
	);
	return (
		<div>
			{participants[0]?.name} - {thread.lastMessage.message}
		</div>
	);
};

function ChatList() {
	const threads = useThreads();
	return (
		<div>
			{threads?.map((t) => (
				<ThreadComp key={t.id} thread={t} />
			))}
		</div>
	);
}

export function AllChats() {
	return (
		<LeftSideContainer>
			<AppHeader />
			<SearchBox />
			<ChatList />
		</LeftSideContainer>
	);
}