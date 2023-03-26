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
	from: { backgroundPosition: "top 0px left -800px" },
	to: { backgroundPosition: "bottom 0px right -800px" },
});

function Hero() {
	return (
		<div
			css={{
				animation: `${shimmer} 5s linear infinite`,
				marginBottom: "1em",
				fontSize: "10em",
				background: " url(horiz-bar-white.png)",
				backgroundSize: "150px 250%",
				backgroundRepeat: "no-repeat",

				// backgroundColor: "#000",
				backgroundClip: "text",
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
