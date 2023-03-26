import { Thread, ThreadSummary } from "shared";
import { useContacts } from "./chat/ChatContext";
import { useUser } from "./Context";

export const isProd = import.meta.env.MODE !== "development";

export const useThreadImage = (thread: Thread | ThreadSummary | undefined) => {
	const [user] = useUser();
	const contacts = useContacts();

	if (!thread || !user || !contacts) {
		return "";
	}

	const participants = thread.participants
		.map((p) => contacts?.find((c) => c.id === p))
		.filter((u) => u)
		.filter((u) => u?.id != user?.userData?.id);

	return participants[0]?.picture;
};

export const useThreadLabel = (thread: Thread | ThreadSummary | undefined) => {
	const [user] = useUser();
	const contacts = useContacts();

	if (!thread || !user || !contacts) {
		return "";
	}

	const participants = thread.participants
		.map((p) => contacts?.find((c) => c.id === p))
		.filter((u) => u)
		.filter((u) => u?.id != user?.userData?.id);

	if (participants.length > 3) {
		return `${participants.length} users`;
	}

	return participants.map((p) => p?.name!).join(", ");
};
