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

	async createThread(users: UserId | UserId[]) {
		if (!Array.isArray(users)) {
			users = [users];
		}

		if (!users.includes(this.user!.userData.id)) {
			users = [...users, this.user!.userData.id];
		}

		return await this.request("chat/thread", {
			method: "POST",
			body: JSON.stringify({ users }),
		});
	}

	async sendWsMessage(id: ThreadId | UserId, message: string) {
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
	});

	return useMemo(
		() => new ChatApiClient(apiEndpoint.http, user, sendJsonMessage),
		//() => new ChatApiClient("/api", user),
		[apiEndpoint, user, sendJsonMessage]
	);
}
