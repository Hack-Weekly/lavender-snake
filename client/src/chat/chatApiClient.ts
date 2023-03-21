import { ApiClientBase } from "@/apiClient";
import { useApiEndpoint, useUser } from "@/Context";
import { ClientUser, UserId } from "@/../../shared/userTypes";
import { useMemo } from "react";
import { Thread, ThreadId, UserChatData } from "../../../shared/chatTypes";
import { threadId } from "worker_threads";

class ChatApiClient extends ApiClientBase {
	constructor(endpoint: string, user: ClientUser | undefined) {
		super(endpoint, "chat", user);
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
}

export function useChatApi() {
	const [user] = useUser();
	const [apiEndpoint] = useApiEndpoint();
	return useMemo(
		() => new ChatApiClient(apiEndpoint, user),
		[apiEndpoint, user]
	);
}
