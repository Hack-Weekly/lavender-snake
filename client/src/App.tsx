import React from "react";
import { Context } from "./Context";
import { RouterProvider } from "react-router-dom";
import { AppContainer, BackgroundImage } from "./styles/shared";
import router from "./router";


function App() {
	return (
		<AppContainer>
			<BackgroundImage src="./lavender-snake-bg.png" />
			<Context>
				<RouterProvider router={router} />
			</Context>
		</AppContainer>
	);
}

export default App;
