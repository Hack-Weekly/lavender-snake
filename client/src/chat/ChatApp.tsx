import styled from "@emotion/styled";
import { createContext } from "react";
import { ChatContext } from "./ChatContext";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

const ChatAppContainer = styled.div({
	minHeight: "100vh", // TODO: use different units here I think
	display: "flex",
	flexDirection: "row",
});

function ChatAppContent() {
	return (
		<ChatAppContainer>
			<LeftSide />
			<RightSide />
		</ChatAppContainer>
	);
}
export function ChatApp() {
	return (
		<ChatContext>
			<ChatAppContent />
		</ChatContext>
	);
}
