import { brandGradient, colors } from "@/branding";
import { ApiEndpoints, testUser, useApiEndpoint, useUser } from "@/Context";
import { pokemon } from "@/pokemon";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { getRandom, sleep } from "shared/utils";
import { Button, Spacer } from "../Dialog";
import { CreateAccountButton, thumbnailForPokemon } from "./CreateAccount";
import { SignIn } from "./SignIn";

const shimmer = keyframes({
	from: { backgroundPosition: "top 0px left 0px" },
	to: { backgroundPosition: "bottom 0px right -200px" },
});

function Hero() {
	return (
		<div
			css={{
				animation: `${shimmer} 3s ease infinite`,
				marginBottom: "1em",
				fontSize: "10em",
				background:
					"linear-gradient(.55turn, rgba(255, 255, 255, 1) 0%,rgba(255, 255, 255, 1) 100%)",
				// "gradient(linear, left top, right top, from(#222), to(#222), color-stop(0.5, #fff))",
				backgroundSize: "12px 500%",
				backgroundRepeat: "no-repeat",

				backgroundColor: "#222",
				backgroundClip: "text",
				transform: "rotate(30deg)",
			}}
		>
			<div
				css={{
					display: "flex",
					justifyContent: "center",

					background:
						"linear-gradient(90deg, rgba(140, 81, 165, .9) 0%,rgba(203, 94, 152, .9) 100%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					fontWeight: "1000",
				}}
			>
				Lavender
			</div>
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
function RandomUser() {
	const [apiEndpoint] = useApiEndpoint();
	const [, setUser] = useUser();

	const email = `rand${Math.floor(Math.random() * 1000000)}@rand.com`;
	const randomSignUp = () => {
		const handler = async () => {
			const p = getRandom(pokemon, 1)[0];
			const resp = await fetch(`${apiEndpoint.http}/user/signup`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					username: p.name, // TODO: something fun
					thumbnail: thumbnailForPokemon(p.id),
					password: "random",
				}),
			});
			const data = await resp.json();
			setUser(data);
		};
		handler();
	};
	return <Button onClick={randomSignUp}>Random user</Button>;
}
function LoginButtons() {
	return (
		<div css={{ display: "flex", justifyContent: "center" }}>
			<CreateAccountButton />
			<Spacer />
			<RandomUser />
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
