import useWebSocket from "react-use-websocket";
import { Thread, UserChatData } from "shared/chatTypes";
import {
	WsEvent,
	WsMessageEvent,
	WsThreadEvent,
	WsTypingEvent,
	WsUserEvent,
} from "shared/wsEvents";
import {
	TypingData,
	useCurrentThreadData,
	useTypingData,
	useUserChatData,
} from "./chat/ChatContext";
import { useApiEndpoint, useUser } from "./Context";
import { DateTime } from "luxon";

export function ServerListener() {
	const [currentThreadData, setCurrentThreadData] = useCurrentThreadData();
	const [userChatData, setUserChatData] = useUserChatData();
	const [user] = useUser();
	const [, setTypingData] = useTypingData();
	const [apiEndpoint] = useApiEndpoint();

	useWebSocket(apiEndpoint.ws, {
		queryParams: { jwt: user ? user.jwt : "" },
		onOpen: () => console.log("Connected to WS"),
		onClose: () => console.log("Disconnected from WS"),
		onMessage: (messageEvent) => {
			const baseEvt: WsEvent = JSON.parse(messageEvent.data);
			// console.log("Received message event from WS: ", baseEvt); // FOR DEBUG
			if (
				baseEvt.dataType === "message" &&
				baseEvt.context === currentThreadData?.id
			) {
				const messageEvt = baseEvt as WsMessageEvent;
				setCurrentThreadData((threadData: Thread) => {
					return {
						...threadData,
						messages: [...threadData.messages, messageEvt.data],
					};
				});
				// Clear typing event for this thread/user
				setTypingData((typingData: TypingData) => {
					typingData[baseEvt.context] ??= {};
					delete typingData[baseEvt.context][messageEvt.data.from];
					return { ...typingData };
				});
			} else if (WsThreadEvent.isInstance(baseEvt)) {
				const threadEvt = baseEvt as WsThreadEvent;
				if (threadEvt.operation === "add") {
					if (threadEvt.data.participants.includes(user?.userData.id ?? "")) {
						setUserChatData((userChatData: UserChatData) => ({
							...userChatData,
							threads: [...userChatData.threads, threadEvt.data],
						}));
					}
				} else if (threadEvt.operation === "update") {
				} else if (threadEvt.operation === "delete") {
				}
			} else if (WsTypingEvent.isInstance(baseEvt)) {
				const typingEvt = baseEvt as WsTypingEvent;
				setTypingData((typingData: TypingData) => {
					typingData[typingEvt.context] ??= {};
					typingData[typingEvt.context][typingEvt.data] = DateTime.now();
					return { ...typingData };
				});
			} else if (WsUserEvent.isInstance(baseEvt)) {
				const userEvt = baseEvt as WsUserEvent;
				if (userEvt.operation === "add") {
					if (!userChatData?.contacts.find((c) => c.id === userEvt.data.id)) {
						// We don't know this user - add them
						setUserChatData((cd: UserChatData) => {
							return {
								...cd,
								contacts: [...cd.contacts, userEvt.data],
							};
						});
					}
				}
			}
		},
		onError: (errorEvent) => console.log(errorEvent),
	});

	return <></>;
}
