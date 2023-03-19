import { colors } from "@/branding";
import { ApiEndpoints } from "@/Context";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { Message, Thread, UserChatData } from "../../../../shared/chatTypes";
import {
	useContacts,
	useCurrentChatData,
	useUserChatData,
} from "../ChatContext";

const RightSideContainer = styled.div({
	minWidth: "73%",
	display: "flex",
	flexDirection: "column",
});

function CurrentChatHeader() {
	return <div>current header</div>;
}

function ChatMessage({ data }: any) {
	console.log(data);
	const contacts = useContacts();
	const user = contacts?.find((user) => user.id === data.from);
	const currentUserId = "bobid"; // TODO
	const isCurrentUser = user?.id === currentUserId;
	return (
		<div
			css={{
				background: isCurrentUser
					? colors.bgChatMessageSelf
					: colors.bgChatMessage,
				marginBottom: "1em",
				borderRadius: ".8em",
				padding: "10px 20px",
				color: isCurrentUser
					? colors.chatMessageTextSelf
					: colors.chatMessageText,
				width: "fit-content",
				alignSelf: isCurrentUser ? "flex-end" : "flex-start",
			}}
		>
			{user?.name}: {data.message}
		</div>
	);
}

function CurrentChatContent() {
	const [chatMessages, setChatMessages] = useState<Message[]>([]);
	const currentChatData = useCurrentChatData();
	useEffect(() => {
		const handler = async () => {
			if (currentChatData) {
				// Load from server
				const resp = await fetch(
					`${ApiEndpoints.Local}/chat/thread/${currentChatData.id}`
				);
				const body = (await resp.json()) as Thread;
				setChatMessages(body.messages);
			} else {
				// clear
				setChatMessages([]);
			}
		};
		handler();
	}, [currentChatData]);
	return (
		<div
			css={{
				background: colors.bgChat,
				display: "flex",
				flexDirection: "column",
			}}
		>
			{chatMessages.map((message) => (
				<ChatMessage key={message.id} data={message} />
			))}
		</div>
	);
}

function CreateChatMessage() {
	const [text, setText] = useState("");
	const [, setUserChatData] = useUserChatData();

	const addMessage = async () => {
		// setUserChatData((userChatData: UserChatData) => {
		// 	userChatData.chatDatas[userChatData.selectedChat].messages.push({
		// 		id: `${Math.floor(Math.random() * 100000)}`,
		// 		from: bob,
		// 		message: text,
		// 	});
		// 	return { ...userChatData };
		// });
		setText("");

		fetch("http://localhost:3000/chat", {
			method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
			}),
			body: JSON.stringify({
				message: text,
				threadId: "thread1",
			}),
		});
	};

	return (
		<div>
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button onClick={addMessage}>Send</button>
		</div>
	);
}

export function ChatScreen() {
	return (
		<RightSideContainer>
			<CurrentChatHeader />
			<CurrentChatContent />
			<CreateChatMessage />
		</RightSideContainer>
	);
}
