import { createContext, useContext, useEffect, useState } from "react";
import { ApiEndpoints, useUser } from "@/Context";
import { Thread, ThreadId, UserChatData } from "../../../shared/chatTypes";
import { useChatApi } from "./chatApiClient";

const ChatContextObj = createContext<[UserChatData | undefined, any]>([
	undefined,
	() => {},
]);
export const useUserChatData = () => useContext(ChatContextObj);
export const useContacts = () => useUserChatData()?.[0]?.contacts;
export const useThreads = () => useUserChatData()?.[0]?.threads;

const SelectedThreadCtx = createContext<[ThreadId | undefined, any]>([
	undefined,
	undefined,
]);
export const useSelectedThread = () => useContext(SelectedThreadCtx);

const CurrentThreadDataCtx = createContext<[Thread | undefined, any]>([
	undefined,
	undefined,
]);
export const useCurrentThreadData = () => useContext(CurrentThreadDataCtx);

export const useCurrentChatData = () => {
	const chatData = useUserChatData()[0];
	const selectedthread = useSelectedThread()[0];
	return chatData?.threads.filter(
		(thread) => thread.id === selectedthread
	)?.[0];
};

export function ChatContext({ children }: any) {
	const [chatData, setChatData] = useState<UserChatData | undefined>(undefined);
	const [selectedThread, setSelectedThread] = useState<ThreadId | undefined>(
		undefined
	);
	const [currentThreadData, setCurrentThreadData] = useState<
		Thread | undefined
	>(undefined);
	const chatApiClient = useChatApi();

	useEffect(() => {
		(async () => {
			if (!chatApiClient.user) {
				return;
			}
			const data = await chatApiClient.getChatData();
			setChatData(data);
			setSelectedThread(data.threads[0].id);
		})();
	}, [chatApiClient]);
	return (
		<ChatContextObj.Provider value={[chatData, setChatData]}>
			<SelectedThreadCtx.Provider value={[selectedThread, setSelectedThread]}>
				<CurrentThreadDataCtx.Provider
					value={[currentThreadData, setCurrentThreadData]}
				>
					{children}
				</CurrentThreadDataCtx.Provider>
			</SelectedThreadCtx.Provider>
		</ChatContextObj.Provider>
	);
}
