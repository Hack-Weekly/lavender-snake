import { brandGradient, colors } from "@/branding";
import { ApiEndpoints, useApiEndpoint, useUser } from "@/Context";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as Dialog from "@radix-ui/react-dialog";
import { createContext, useContext, useMemo, useState } from "react";
import { arrayRange, sleep, getRandom } from "shared/utils";
import { useQuery } from "react-query";
import {
	Button,
	DialogContent,
	DialogDescription,
	DialogOverlay,
	DialogTitle,
	Fieldset,
	Flex,
	IconButton,
	Input,
	Label,
} from "../Dialog";
import { Gallery, ThumbnailImageProps } from "react-grid-gallery";

const SelectedImageCtx = createContext<[number | undefined, any]>([
	undefined,
	undefined,
]);

const thumbnailForPokemon = (id: number) =>
	`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
const pokemonIds = getRandom(arrayRange(1, 1000), 20);
const pokemonImages = pokemonIds.map((id) => ({
	pokemonId: id,
	src: thumbnailForPokemon(id),
	width: 14,
	height: 14,
	thumbnailWidth: 14,
	thumbnailHeight: 14,
}));
function ThumbnailImage(props: any) {
	const [selectedImage, setSelectedImage] = useContext(SelectedImageCtx);
	const pokemonId = props.item.pokemonId;
	const onSelect = () => {
		setSelectedImage(pokemonId);
	};

	// @ts-ignore
	return (
		<img
			css={{
				background:
					selectedImage === pokemonId ? colors.accent : colors.bgChatMessage,
			}}
			onClick={onSelect}
			{...props.imageProps}
		/>
	);
}

function PokemonSelector() {
	return (
		<div css={{ overflowY: "scroll", maxHeight: "300px" }}>
			<Gallery
				rowHeight={92}
				images={pokemonImages}
				enableImageSelection={false}
				thumbnailImageComponent={ThumbnailImage}
			/>
		</div>
	);
}
export function CreateAccountButton() {
	const [open, setOpen] = useState(false);
	const [selectedImage, setSelectedImage] = useState<number | undefined>(
		undefined
	);

	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [, setUser] = useUser();
	const [apiEndpoint] = useApiEndpoint();

	const createAccount = async () => {
		const resp = await fetch(`${apiEndpoint.http}/user/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				username,
				password,
				thumbnail: thumbnailForPokemon(selectedImage),
			}),
		});

		const data = await resp.json();

		if (resp.ok) {
			setErrorMessage("");
			setSuccessMessage("Success! Logging you in...");
			await sleep(1700);
			setOpen(false);
			setUser(data);
		} else {
			setErrorMessage(data.message || data.error?.validation?.message);
		}
	};

	return (
		<SelectedImageCtx.Provider value={[selectedImage, setSelectedImage]}>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger asChild>
					<Button>Create account</Button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<DialogOverlay />
					<DialogContent>
						<DialogTitle>Create account</DialogTitle>
						<DialogDescription>
							Make changes to your profile here. Click save when you're done.
						</DialogDescription>
						<Fieldset>
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								value={email}
								onChange={(x) => setEmail(x.target.value)}
							/>
						</Fieldset>
						<Fieldset>
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								value={username}
								onChange={(x) => setUserName(x.target.value)}
							/>
						</Fieldset>
						<Fieldset>
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								value={password}
								onChange={(x) => setPassword(x.target.value)}
							/>
						</Fieldset>
						<Fieldset>
							{/* <Flex>
							{pokemonIds.map((id) => (
								<PokemonButton key={id} pokemonId={id} />
							))}
						</Flex> */}
						</Fieldset>
						<PokemonSelector />
						<Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
							<Button onClick={createAccount}>Create</Button>
						</Flex>
						<Dialog.Close asChild>
							<IconButton aria-label="Close">X</IconButton>
						</Dialog.Close>
						<Flex>
							{errorMessage && (
								<Flex css={{ color: colors.errorText }}>{errorMessage}</Flex>
							)}
							{successMessage && (
								<Flex css={{ color: colors.successText }}>
									{successMessage}
								</Flex>
							)}
						</Flex>
					</DialogContent>
				</Dialog.Portal>
			</Dialog.Root>
		</SelectedImageCtx.Provider>
	);
}
