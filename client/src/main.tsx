import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Global, css } from "@emotion/react";
import normalize from "normalize.css/normalize.css?inline";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Global
			styles={css`
				${normalize}
			`}
		/>
		<App />
	</React.StrictMode>
);
