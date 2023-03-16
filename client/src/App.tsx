import React from "react";
import { Context } from "./Context";
import { RouterProvider } from "react-router-dom";
import { AppContainer, BackgroundImage } from "./styles/shared";
import { AppRouter } from "./router";

function App() {
	return (
		<AppContainer>
			<BackgroundImage src="./lavender-snake-bg.png" />
			<Context>
				<AppRouter />
			</Context>
		</AppContainer>
	);
}

export default App;
