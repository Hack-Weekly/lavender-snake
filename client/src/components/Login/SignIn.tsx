import { brandGradient, colors } from "@/branding";
import { ApiEndpoints, useUser } from "@/Context";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { sleep } from "../../../../shared/utils";
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

export function SignIn() {
	const [open, setOpen] = useState(false);

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [, setUser] = useUser();
	const createAccount = async () => {
		const resp = await fetch(`${ApiEndpoints.Local}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
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
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<Button>Sign in</Button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<DialogOverlay />
				<DialogContent>
					<DialogTitle>Sign in</DialogTitle>
					<Fieldset>
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							value={email}
							onChange={(x) => setEmail(x.target.value)}
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
					<Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
						<Button onClick={createAccount}>Sign in</Button>
					</Flex>
					<Dialog.Close asChild>
						<IconButton aria-label="Close">X</IconButton>
					</Dialog.Close>
					<Flex>
						{errorMessage && (
							<Flex css={{ color: colors.errorText }}>{errorMessage}</Flex>
						)}
						{successMessage && (
							<Flex css={{ color: colors.successText }}>{successMessage}</Flex>
						)}
					</Flex>
				</DialogContent>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
