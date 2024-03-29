import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FC, useState } from "react";
import { ThreadSummary } from "shared/chatTypes";
import {
	useContacts,
	useSelectedThread,
	useThreads,
	useUserChatData,
} from "../ChatContext";
import { MdAccountCircle } from "react-icons/md";
import { chatColors } from "@/chatColors";
import { brandGradient } from "@/branding";
import { Button } from "@/components/Dialog";
import { DateTime } from "luxon";
import { useUser } from "@/Context";
import { useThreadImage, useThreadLabel } from "@/utils";
import { NewChatButton } from "./NewChatButton";

export const homeScreenCSS = {
	homeScreenContainer: css({
		minWidth: "27%",
		display: "flex",
		flexDirection: "column",
		position: "relative",
		background: chatColors.tertiaryBG,
	}),
	header: css({
		minHeight: "4rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "left",
		padding: "0 1.3rem",
		background: chatColors.secondaryBG,
		borderRight: `1px solid #383456`,
	}),
	unreadChatCount: css({
		marginLeft: "0.7rem",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: "0.85rem",
		width: "1.6rem",
		height: "1.5rem",
		background: chatColors.accent,
		color: chatColors.darkText,
		borderRadius: "0.7rem",
	}),
	account: css({
		marginLeft: "auto",
		display: "flex",
		alignItems: "center",
		fontSize: "1.8rem",
		cursor: "pointer",
	}),
	search: css({
		margin: "1.3rem",
	}),
	searchInput: css({
		width: "100%",
		padding: "1rem 1.5rem",
		background: chatColors.secondaryText,
		color: chatColors.darkText,
		border: "none",
		borderRadius: "12px",
		outline: "none",
		"&::placeholder": {
			color: chatColors.darkText,
			opacity: "0.6",
		},
	}),
	chatList: css({
		width: "100%",
		padding: "1.3rem",
		display: "flex",
		flexDirection: "column",
	}),
	threadCSS: css({
		display: "flex",
		flexDirection: "row",
		padding: "0.5rem",
		borderRadius: "0.5rem",
		cursor: "pointer",
		"&:hover": {
			background: chatColors.highLight,
		},
	}),
	avatar: css({
		"& img": {
			display: "block",
			width: "3.4rem",
			height: "3.4rem",
			borderRadius: "50%",
		},
	}),
	nameAndMessage: css({
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		margin: "0.4rem 0 0.5rem 1rem",
	}),
	name: css({
		fontSize: "1.1rem",
		fontWeight: "500",
		color: chatColors.primaryText,
	}),
	message: css({
		color: chatColors.secondaryText,
	}),
	time: css({
		marginLeft: "auto",
		display: "flex",
		alignItems: "center",
		color: chatColors.secondaryText,
	}),
	newChatButton: css({
		position: "absolute",
		right: "10%",
		bottom: "3%",
		fontSize: "4.2rem",
		display: "flex",
		alignItems: "center",
		color: chatColors.secondaryAccent,
		cursor: "pointer",
		"&:hover": {
			color: chatColors.accent,
		},
	}),
};

const Thread = styled.div<{ active: boolean }>`
	background: ${(item) => (item.active ? chatColors.highLight : "")};
	border-radius: 0.5rem;
`;

function HomeScreenHeader() {
	const [userChatData] = useUserChatData();
	return (
		<div css={homeScreenCSS.header}>
			<div css={[brandGradient, { fontSize: "1.5rem" }]}>
				Lavender
				<span
					css={{
						fontVariant: "all-small-caps",
						fontSize: "1.4em",
						fontWeight: "500",
					}}
				>
					Line
				</span>
			</div>
			<div css={homeScreenCSS.unreadChatCount}>
				{userChatData?.threads?.length ?? 0}
			</div>
			<div css={homeScreenCSS.account}>
				<MdAccountCircle />
			</div>
		</div>
	);
}

export function SearchBox({ placeholder }: { placeholder: string }) {
	return (
		<div css={homeScreenCSS.search}>
			<input
				type="text"
				css={homeScreenCSS.searchInput}
				placeholder={placeholder}
			/>
		</div>
	);
}

function getTime(time: string) {
	const messageTime = DateTime.fromISO(time);
	const diff = DateTime.now().diff(messageTime, ["hours", "minutes"]);

	const hours = Math.round(diff.hours);
	const minutes = Math.round(diff.minutes);

	if (hours >= 12) {
		return messageTime.toLocaleString(DateTime.DATE_SHORT);
	} else if (hours >= 1) {
		return messageTime.toLocaleString(DateTime.TIME_SIMPLE);
	} else if (minutes > 0) {
		return minutes + ` m`;
	} else {
		return "Now";
	}
}

const ThreadComp: FC<{ thread: ThreadSummary }> = ({ thread }) => {
	const threadImage = useThreadImage(thread);
	const threadLabel = useThreadLabel(thread);
	const lastMessage = thread.lastMessage;

	return (
		<div css={homeScreenCSS.threadCSS}>
			<div css={homeScreenCSS.avatar}>
				<img src={threadImage} alt="" />
			</div>
			<div css={homeScreenCSS.nameAndMessage}>
				<div css={homeScreenCSS.name}>{threadLabel}</div>
				<div css={homeScreenCSS.message}>{lastMessage?.message}</div>
			</div>
			<div css={homeScreenCSS.time}>
				{lastMessage ? getTime(lastMessage.dateTime) : ""}
			</div>
		</div>
	);
};

function ChatList() {
	const threads = useThreads();
	const [selectedId, setSelectedId] = useSelectedThread();
	return (
		<div css={homeScreenCSS.chatList}>
			{threads?.map((t) => (
				<Thread
					key={t.id}
					active={t.id === selectedId}
					onClick={() => {
						setSelectedId(t.id);
					}}
				>
					<ThreadComp key={t.id} thread={t} />
				</Thread>
			))}
		</div>
	);
}

export function HomeScreen() {
	return (
		<div css={homeScreenCSS.homeScreenContainer}>
			<HomeScreenHeader />
			<SearchBox placeholder="Search messages..." />
			<ChatList />
			<NewChatButton />
		</div>
	);
}
