import styled from "@emotion/styled";
import { ChatContext } from "./ChatContext";
import { HomeScreen } from "./components/HomeScreen"
import { ChatScreen } from "./components/ChatScreen";

const ChatAppContainer = styled.div({
	minHeight: "100vh", // TODO: use different units here I think
	display: "flex",
	flexDirection: "row",
});

function ChatAppContent() {
	return (
		<ChatAppContainer>
			<HomeScreen />
			<ChatScreen />
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
