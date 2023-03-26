import { ApiClientBase } from "@/apiClient";
import { useApiEndpoint, useUser } from "@/Context";
import { ClientUser, UserId } from "shared/userTypes";
import { useMemo } from "react";
import { Thread, ThreadId, UserChatData } from "shared/chatTypes";
import { threadId } from "worker_threads";
import useWebSocket from "react-use-websocket";
import { WsEvent, WsMessageEvent, WsTypingEvent } from "shared";

class ChatApiClient extends ApiClientBase {
	wsSendMessage: Function;

	constructor(
		endpoint: string,
		user: ClientUser | undefined,
		sendJsonMessage: Function
	) {
		super(endpoint, "chat", user);
		this.wsSendMessage = sendJsonMessage;
	}

	async getChatData() {
		return (await this.get()) as UserChatData;
	}

	async getThread(id: ThreadId) {
		return (await this.get(`chat/thread/${id}`)) as Thread;
	}

	async sendMessage(id: ThreadId | UserId, message: string) {
		return (await this.post({ threadId: id, message })) as Thread;
	}

	async sendWsMessage(id: ThreadId | UserId, message: string) {
		// I'm confused about how to use the WsMessageEvent
		// For now I just hard code the message to be in the same form as WsMessageEvent

		// const data: WsMessageEvent = {
		// 	dataType: "message",
		// 	operation: "add",
		// 	context: id,
		// 	data: {
		// 		id: "123", // how to get this?
		// 		from: "username", // how to get this?
		// 		message: message,
		// 	},
		// };

		this.wsSendMessage({ threadId: id, message });
	}

	async sendTyping(threadId: ThreadId | undefined) {
		if (!this.user || !threadId) {
			return;
		}

		const msg = new WsTypingEvent(threadId, this.user.userData.id);
		this.wsSendMessage(msg);
	}
}

export function useChatApi() {
	const [user] = useUser();
	const [apiEndpoint] = useApiEndpoint();

	const { sendJsonMessage } = useWebSocket(apiEndpoint.ws, {
		queryParams: { jwt: user ? user.jwt : "" },
		onMessage: (messageEvent) => {
			console.log(messageEvent);
		},
	});

	return useMemo(
		() => new ChatApiClient(apiEndpoint.http, user, sendJsonMessage),
		//() => new ChatApiClient("/api", user),
		[apiEndpoint, user, sendJsonMessage]
	);
}
