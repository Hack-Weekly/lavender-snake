import { colors } from "@/branding";
import { ApiEndpoints, useUser } from "@/Context";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FC, useCallback, useEffect, useState } from "react";
import { Message, Thread, UserChatData } from "shared/chatTypes";
import { useChatApi } from "../chatApiClient";
import {
	useContacts,
	useCurrentChatData,
	useCurrentThreadData,
	useSelectedThread,
	useUserChatData,
} from "../ChatContext";
import { chatColors } from "@/chatColors";
import dummyImage1 from "../../chatImages/3.jpg";
import { BsCircleFill, BsThreeDotsVertical, BsSendFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { DateTime, Duration } from "luxon";

interface ChatMessageProps {
	data: Message;
}

const ChatScreenContainer = styled.div({
	minWidth: "73%",
	display: "flex",
	flexDirection: "column",
	position: "relative",
});

const chatScreenCSS = {
	header: css({
		height: "4rem",
		display: "flex",
		flexDirection: "row",
		padding: "0 1.3rem",
		background: chatColors.secondaryBG,
	}),
	avatar: css({
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		"& img": {
			display: "block",
			width: "2.8rem",
			height: "2.8rem",
			borderRadius: "50%",
		},
	}),
	nameAndStatus: css({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		gap: "0.1rem",
		marginLeft: "0.5rem",
		cursor: "pointer",
	}),
	recipientName: css({
		color: chatColors.accent,
	}),
	onlineStatus: css({
		display: "flex",
		alignItems: "center",
		gap: "0.2rem",
		fontSize: "0.9rem",
		color: chatColors.secondaryText,
		"& svg": {
			fontSize: "0.5rem",
			fill: chatColors.online,
		},
	}),
	options: css({
		marginLeft: "auto",
		display: "flex",
		alignItems: "center",
		fontSize: "1.5rem",
		cursor: "pointer",
	}),
	chatContents: css({
		// overflow: 'hidden',
	}),
	chatMessagesContainer: css({
		height: "calc(100vh - 8rem)",
		background: colors.bgChat,
		display: "flex",
		flexDirection: "column-reverse",
		padding: "1rem 1.5rem 0rem",
		overflow: "auto",
		"&::-webkit-scrollbar": {
			width: ".3rem",
			backgroundColor: chatColors.chatBG,
		},
		"&::-webkit-scrollbar-thumb": {
			backgroundColor: chatColors.secondaryText,
		},
	}),
	chatMessages: css({
		display: "flex",
		flexDirection: "column",
	}),
	createMessageContainer: css({
		height: "4rem",
		padding: "0 2.5rem 0 1rem",
		background: "#344652",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		"& svg": {
			stroke: chatColors.secondaryAccent,
			fill: chatColors.secondaryAccent,
		},
	}),
	createMessageInputContainer: css({
		width: "92%",
		position: "relative",
		display: "flex",
		alignItems: "center",
	}),
	createMessageInput: css({
		width: "100%",
		height: "2.5rem",
		padding: "0 3rem 0 0.5rem",
		borderRadius: "0.5rem",
		background: chatColors.secondaryText,
		outline: "none",
		border: "2px solid #E2E8F0",
	}),
	attachmentButton: css({
		fontSize: "1.3rem",
		cursor: "pointer",
	}),
	sendButton: css({
		fontSize: "1.5rem",
		position: "absolute",
		right: "2%",
		cursor: "pointer",
	}),
};

function CurrentChatHeader() {
	return (
		<div css={chatScreenCSS.header}>
			<div css={chatScreenCSS.avatar}>
				<img src={dummyImage1} alt="" />
			</div>
			<div css={chatScreenCSS.nameAndStatus}>
				<div css={chatScreenCSS.recipientName}>Lavender Buddy</div>
				<div css={chatScreenCSS.onlineStatus}>
					<BsCircleFill />
					<div>Online</div>
				</div>
			</div>
			<div css={chatScreenCSS.options}>
				<BsThreeDotsVertical />
			</div>
		</div>
	);
}

function getTime(time : string){	
	const messageTime = DateTime.fromISO(time);
	const currentTime = DateTime.now();

	const tDiff = currentTime.diff(messageTime, ['hours', 'minutes']).toObject();
	const hours = tDiff.hours;
	const minutes = tDiff.minutes;

	if(hours >= 1){
		return messageTime.toLocaleString(DateTime.DATETIME_SHORT);
	}else if(minutes >= 30){
		return messageTime.toLocaleString(DateTime.TIME_SIMPLE);
	}else if(minutes < 30){
		return (parseInt(minutes) + ' minutes ago');
	}else if(minutes < 2){
		return (parseInt(minutes) + ' minute ago');
	}
	
	return ""
}

const ChatMessage: FC<ChatMessageProps> = ({ data }) => {
	const contacts = useContacts();
	const user = contacts?.find((user) => user.id === data.from);
	const [currentUser] = useUser();
	const isCurrentUser = user?.id === currentUser?.userData?.id;
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
			<span>{user?.name ?? ""}</span> : <span>{data.message}</span> | <span>{getTime(data.dateTime)}</span>
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
				console.log("loading from server?");
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
		<div css={chatScreenCSS.chatContents}>
			<CurrentChatHeader />
			<div css={chatScreenCSS.chatMessagesContainer}>
				{/* the container uses column-reverse direction which helps keep initial chat scroll at bottom, but it reverses contents. The next div is additional one which tackles the reverse content */}
				<div css={chatScreenCSS.chatMessages}>
					{currentThreadData?.messages.map((message) => (
						<ChatMessage key={message.id} data={message} />
					))}
				</div>
			</div>
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
			await chatApiClient.sendWsMessage(curThreadId, text);
		}
	};

	return (
		<div css={chatScreenCSS.createMessageContainer}>
			<GrAttachment css={chatScreenCSS.attachmentButton} />
			<div css={chatScreenCSS.createMessageInputContainer}>
				<input
					type="text"
					value={text}
					onChange={(e) => setText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") addMessage();
					}}
					css={chatScreenCSS.createMessageInput}
				/>
				<BsSendFill onClick={addMessage} css={chatScreenCSS.sendButton} />
			</div>
		</div>
	);
}

export function ChatScreen() {
	return (
		<ChatScreenContainer>
			<CurrentChatContent />
			<CreateChatMessage />
		</ChatScreenContainer>
	);
}
