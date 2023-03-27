import { MdAddCircle } from "react-icons/md";
import * as Dialog from "@radix-ui/react-dialog";
import {
	DialogContent,
	DialogOverlay,
	DialogTitle,
	Flex,
	IconButton,
} from "@/components/Dialog";
import { homeScreenCSS, SearchBox } from "./HomeScreen";
import { useUserChatData } from "../ChatContext";
import { User } from "shared/userTypes";
import { FC, useState } from "react";
import { useUser } from "@/Context";
import { colors } from "@/branding";
import { useChatApi } from "../chatApiClient";

interface EntryProps {
	user: User;
	setSelected: any;
	selected: any;
}
const Entry: FC<EntryProps> = ({ user, setSelected, selected }) => {
	const toggle = () => {
		setSelected((s: any) => {
			s[user.id] = !s[user.id];
			return { ...s };
		});
	};
	return (
		<Flex
			css={{
				flexDirection: "row",
				backgroundColor: selected[user.id]
					? colors.bgChatMessageSelf
					: "inherit",
			}}
			onClick={toggle}
		>
			<img width="100px" src={user.picture} />
			<div
				css={{
					display: "flex",
					alignItems: "center",
					padding: "50px",
				}}
			>
				{user.name}
			</div>
		</Flex>
	);
};

export function NewChatButton() {
	const [user] = useUser();
	const [selected, setSelected] = useState<any>({});
	const [userChatData] = useUserChatData();
	const selArr = Object.entries(selected)
		.filter((x) => x[1])
		.map((x) => x[0]) as string[];
	const chatApi = useChatApi();

	if (!userChatData || !user) {
		return <></>;
	}

	const create = async () => {
		const res = await chatApi.createThread(selArr);
		setSelected([]);
	};

	return (
		<div css={homeScreenCSS.newChatButton}>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<div>
						<MdAddCircle />
					</div>
				</Dialog.Trigger>
				<Dialog.Portal>
					<DialogOverlay />
					<DialogContent css={{ fontFamily: "Outfit, sans-serif" }}>
						<DialogTitle>Select message participants</DialogTitle>
						<div>
							{userChatData.contacts
								.filter((u) => u.id != user.userData.id)
								.map((c) => (
									<Entry
										key={c.id}
										user={c}
										selected={selected}
										setSelected={setSelected}
									/>
								))}
						</div>
						<Flex css={{ justifyContent: "end" }}>
							<Dialog.Close asChild>
								<button
									disabled={selArr.length < 1}
									type="submit"
									css={{
										background: "#4F378B",
										color: "#e6e6fa",
										borderRadius: "12px",
										border: "none",
										cursor: "pointer",
										padding: "15px",
										"&:disabled": {
											backgroundColor: colors.bgChatMessage,
										},
									}}
									onClick={create}
								>
									Create
								</button>
							</Dialog.Close>
						</Flex>

						<Dialog.Close asChild>
							<IconButton aria-label="Close">X</IconButton>
						</Dialog.Close>
					</DialogContent>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
