import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FC, useState } from "react";
import { ThreadSummary } from "shared/chatTypes";
import { useContacts, useThreads } from "../ChatContext";
import { MdAccountCircle, MdAddCircle } from "react-icons/md";
import { chatColors } from "@/chatColors";
import { brandGradient } from "@/branding";
import dummyProfilePic1 from "../../chatImages/3.jpg";
import * as Popover from '@radix-ui/react-popover';

const homeScreenCSS = {
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
		right: "20%",
		bottom: "10%",
		fontSize: "2.2rem",
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
			<div css={homeScreenCSS.unreadChatCount}>12</div>
			<div css={homeScreenCSS.account}>
				<MdAccountCircle />
			</div>
		</div>
	);
}

function SearchBox() {
	return (
		<div css={homeScreenCSS.search}>
			<input
				type="text"
				css={homeScreenCSS.searchInput}
				placeholder="Search messages"
			/>
		</div>
	);
}

const ThreadComp: FC<{ thread: ThreadSummary }> = ({ thread }) => {
	const contacts = useContacts();
	const participants = thread.participants.map((p) =>
		contacts?.find((c) => c.id === p)
	);
	return (
		<div css={homeScreenCSS.threadCSS}>
			<div css={homeScreenCSS.avatar}>
				<img src={dummyProfilePic1} alt="" />
			</div>
			<div css={homeScreenCSS.nameAndMessage}>
				<div css={homeScreenCSS.name}>{participants[0]?.name}</div>
				<div css={homeScreenCSS.message}>{thread.lastMessage.message}</div>
			</div>
			<div css={homeScreenCSS.time}>12m</div>
		</div>
	);
};

function ChatList() {
	const threads = useThreads();
	const [selectedId, setSelectedId] = useState("");
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

function NewChatButton() {
	const [open, setOpen] = useState(false);
	
	// const handleAddNewUser = () => {
	// 	return (
			
	// 	);
	// }
	return (
		<div css={homeScreenCSS.newChatButton}>
			<Popover.Root>
    		<Popover.Trigger asChild	>
					<MdAddCircle />
				</Popover.Trigger>
    		<Popover.Anchor />
				<Popover.Portal>
	      <Popover.Content side="right" asChild>
					<div css={{width: "var(--radix-popover-trigger-width)", height: "var(--radix-popover-content-available-height)", background: chatColors.accent}}>test
						
						<Popover.Close>x</Popover.Close>
						<Popover.Arrow />
					</div>
      	</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</div>
	);
}

export function HomeScreen() {
	return (
		<div css={homeScreenCSS.homeScreenContainer}>
			<HomeScreenHeader />
			<SearchBox />
			<ChatList />
			<NewChatButton />
		</div>
	);
}
