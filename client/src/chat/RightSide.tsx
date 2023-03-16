import styled from "@emotion/styled";
import { useCallback, useState } from "react";
import {
	bob,
	useCurrentChatData,
	UserChatData,
	useUserChatData,
} from "./ChatContext";

const RightSideContainer = styled.div({
	minWidth: "75vh", // TODO: I think this is wrong
	display: "flex",
	flexDirection: "column",
});

function CurrentChatHeader() {
	return <div>current header</div>;
}

function ChatMessage({ data }: any) {
	console.log(data);
	return (
		<div>
			{data.from.name}: {data.message}
		</div>
	);
}

function CurrentChatContent() {
	const currentChatData = useCurrentChatData();
	return (
		<div>
			{currentChatData.messages.map((data) => (
				<ChatMessage key={data.id} data={data} />
			))}
		</div>
	);
}

function CreateChatMessage() {
	const [text, setText] = useState("");
	const [, setUserChatData] = useUserChatData();

	const addMessage = () => {
		setUserChatData((userChatData: UserChatData) => {
			userChatData.chatDatas[userChatData.selectedChat].messages.push({
				id: `${Math.floor(Math.random() * 100000)}`,
				from: bob,
				message: text,
			});
			return { ...userChatData };
		});
		setText("");
	};

	return (
		<div>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button onClick={addMessage as any}>Send</button>
		</div>
	);
}

export function RightSide() {
	return (
		<RightSideContainer>
			<CurrentChatHeader />
			<CurrentChatContent />
			<CreateChatMessage />
		</RightSideContainer>
	);
}