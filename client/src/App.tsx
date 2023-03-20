import React from "react";
import { Context, useUser } from "./Context";
import { RouterProvider } from "react-router-dom";
import { AppContainer, BackgroundImage } from "./styles/shared";
import { AppRouter } from "./router";
import ReactDOM from "react-dom/client";
import { Global, css } from "@emotion/react";
import normalize from "normalize.css/normalize.css?inline";
import { colors } from "./branding";
import { LoginPage } from "./components/Login/LoginPage";

function AppContent() {
	const [user] = useUser();
	console.log(user);
	if (!user) return <LoginPage />;
	return <AppRouter />;
}
function App() {
	return (
		<AppContainer>
			<BackgroundImage src="./lavender-snake-bg.png" />
			<Context>
				<AppContent />
			</Context>
		</AppContainer>
	);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Global
			styles={css`
				${normalize}
				body {
					background-color: ${colors.bgPrimary};
					color: ${colors.textPrimary};
				}
			`}
		/>
		<App />
	</React.StrictMode>
);
