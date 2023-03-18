import { createContext, useContext, useEffect, useState } from "react";
import { ApiEndpoints, useUser } from "@/Context";
import { ThreadId, UserChatData } from "../../../shared/chatTypes";

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

	useEffect(() => {
		(async () => {
			const res = await fetch(`${ApiEndpoints.Local}/chat`);
			const body = (await res.json()) as UserChatData;
			console.log(body);
			setChatData(body);
			setSelectedThread(body.threads[0].id);
		})();
	}, []);
	return (
		<ChatContextObj.Provider value={[chatData, setChatData]}>
			<SelectedThreadCtx.Provider value={[selectedThread, setSelectedThread]}>
				{children}
			</SelectedThreadCtx.Provider>
		</ChatContextObj.Provider>
	);
}
