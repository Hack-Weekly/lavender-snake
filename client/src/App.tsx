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
import styled from "@emotion/styled";
import { ServerListener } from "./ServerListener";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function AppContent() {
	const [user] = useUser();
	if (!user) return <LoginPage />;
	return <AppRouter />;
}

function App() {
	return (
		<AppContainer>
			<BackgroundImage src="./lavender-snake-bg.png" />
			<QueryClientProvider client={queryClient}>
				<Context>
					<AppContent />
				</Context>
			</QueryClientProvider>
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
