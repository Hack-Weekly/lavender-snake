import useWebSocket from "react-use-websocket";
import { Thread } from "shared/chatTypes";
import { WsEvent } from "shared/wsEvents";
import { useCurrentThreadData } from "./chat/ChatContext";
import { useUser } from "./Context";

export function ServerListener() {
	const [currentThreadData, setCurrentThreadData] = useCurrentThreadData();
	const [user] = useUser();

	useWebSocket("ws://localhost:3000/ws", {
		queryParams: { jwt: user ? user.jwt : "" },
		onOpen: () => console.log("Connected to WS"),
		onClose: () => console.log("Disconnected from WS"),
		onMessage: (messageEvent) => {
			const baseEvt: WsEvent = JSON.parse(messageEvent.data);
			console.log("Received message event from WS: ", baseEvt); // FOR DEBUG
			if (
				baseEvt.dataType === "message" &&
				baseEvt.context === currentThreadData?.id
			) {
				setCurrentThreadData((threadData: Thread) => {
					return {
						...threadData,
						messages: [...threadData.messages, baseEvt.data],
					};
				});
			}
		},
		onError: (errorEvent) => console.log(errorEvent),
	});

	return <></>;
}
