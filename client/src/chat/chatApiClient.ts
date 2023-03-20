import { ApiClientBase } from "@/apiClient";
import { useApiEndpoint, User, useUser } from "@/Context";
import { useMemo } from "react";
import { UserChatData } from "../../../shared/chatTypes";

class ChatApiClient extends ApiClientBase {
	constructor(endpoint: string, user: User | undefined) {
		super(endpoint, "chat", user);
	}

	async getChatData() {
		return (await this.get()) as UserChatData;
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
