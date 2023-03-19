import { brandGradient } from "@/branding";
import styled from "@emotion/styled";

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

const Spacer = styled.div`
	flex: 100;
`;

function LoginButtons() {
	return (
		<div css={{ display: "flex", justifyContent: "center" }}>
			<button>Create Account</button>
			<Spacer />
			<button>Log In</button>
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
