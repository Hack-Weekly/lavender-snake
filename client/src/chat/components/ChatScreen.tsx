import { colors } from "@/branding";
import { ApiEndpoints, useUser } from "@/Context";
import styled from "@emotion/styled";
import { useCallback, useEffect, useState } from "react";
import { Message, Thread, UserChatData } from "../../../../shared/chatTypes";
import { useChatApi } from "../chatApiClient";
import {
	useContacts,
	useCurrentChatData,
	useCurrentThreadData,
	useSelectedThread,
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
	const contacts = useContacts();
	const user = contacts?.find((user) => user.id === data.from);
	const [currentUser] = useUser();
	const isCurrentUser = user?.id === currentUser?.userData?.id;
	console.log(user);
	console.log(currentUser);
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
	const [currentThreadData, setCurrentThreadData] = useCurrentThreadData();
	const currentChatData = useCurrentChatData();
	const chatApiClient = useChatApi();
	// TODO: move this to context
	useEffect(() => {
		const handler = async () => {
			if (currentChatData) {
				// Load from server
				const threadData = await chatApiClient.getThread(currentChatData.id);
				console.log(threadData);
				setCurrentThreadData(threadData);
			} else {
				// clear
				setCurrentThreadData(undefined);
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
			{currentThreadData?.messages.map((message) => (
				<ChatMessage key={message.id} data={message} />
			))}
		</div>
	);
}

function CreateChatMessage() {
	const [text, setText] = useState("");
	const [, setUserChatData] = useUserChatData();
	const chatApiClient = useChatApi();
	const [curThreadId] = useSelectedThread();
	const [, setCurrentThreadData] = useCurrentThreadData();

	const addMessage = async () => {
		if (curThreadId) {
			setText("");
			const newThread = await chatApiClient.sendMessage(curThreadId, text);
			setCurrentThreadData(newThread);
		}
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
