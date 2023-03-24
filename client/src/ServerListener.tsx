import useWebSocket, { ReadyState } from "react-use-websocket";
import { Thread } from "shared/chatTypes";
import { WsEvent, WsMessageEvent, WsThreadEvent } from "shared/wsEvents";
import { useCurrentThreadData, useSelectedThread } from "./chat/ChatContext";

export function ServerListener() {
	const [cc, setCurrentThreadData] = useCurrentThreadData();

	const { sendMessage, lastMessage, readyState } = useWebSocket(
		"ws://localhost:3000/ws/chat",
		{
			onOpen: () => console.log("connected to ws"),
			onClose: () => console.log("disconnected from ws"),
			onMessage: (messageEvent) => {
				const baseEvt: WsEvent = JSON.parse(messageEvent.data);
				if (baseEvt.dataType === "message") {
					// TODO: this is wrong; it may not be the current thread
					// set user data with updated 'lastMessage', and if it is current thread,
					// add the message
					setCurrentThreadData((threadData: Thread) => {
						return {
							...threadData,
							messages: [...threadData.messages, baseEvt.data],
						};
					});
				}
			},
			onError: (errorEvent) => console.log(errorEvent),
		}
	);

	return <></>;
}
