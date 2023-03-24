import { brandGradient, colors } from "@/branding";
import { ApiEndpoints, testUser, useApiEndpoint, useUser } from "@/Context";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { sleep } from "shared/utils";
import { Button, Spacer } from "../Dialog";
import { CreateAccountButton } from "./CreateAccount";
import { SignIn } from "./SignIn";

function Hero() {
	return (
		<div
			css={[
				brandGradient,
				{
					display: "flex",
					justifyContent: "center",
					fontSize: "10em",
					marginBottom: "1em",
				},
			]}
		>
			Lavender
		</div>
	);
}

function DevSignIn() {
	const [apiEndpoint] = useApiEndpoint();
	const [, setUser] = useUser();
	const devSignIn = () => {
		const handler = async () => {
			const resp = await fetch(`${apiEndpoint.http}/user/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email: "testuser@dummy.com", password: "test" }),
			});
			const data = await resp.json();
			setUser(data);
		};
		handler();
	};
	return <Button onClick={devSignIn}>Dev sign in</Button>;
}
function LoginButtons() {
	return (
		<div css={{ display: "flex", justifyContent: "center" }}>
			<CreateAccountButton />
			<Spacer />
			<DevSignIn />
			<SignIn />
		</div>
	);
}

export function LoginPage() {
	return (
		// This is the container
		<div
			css={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
			}}
		>
			{/* This wraps all the content */}
			<div
				css={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					width: "fit-content",
					alignSelf: "center",
				}}
			>
				<Hero />
				<LoginButtons />
			</div>
		</div>
	);
}
