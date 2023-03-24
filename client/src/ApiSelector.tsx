import { ApiEndpoints, useApiEndpoint } from "./Context";
import { isProd } from "./utils";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";
import { ToggleItem } from "./styles/shared";

function ApiSelector() {
	const [apiEndpoint, setApiEndpoint] = useApiEndpoint();

	// hide in prod
	if (isProd) {
		return null;
	}

	return (
		<div
			css={{
				position: "absolute",
				bottom: "3rem",
				left: "7rem",
				color: "black",
			}}
		>
			<ToggleGroup.Root
				type="single"
				value={apiEndpoint.name}
				onValueChange={(sel) => {
					if (sel)
						setApiEndpoint(
							Object.values(ApiEndpoints).find((ep) => ep.name === sel)
						);
				}}
			>
				<ToggleItem value={ApiEndpoints.Local.name}>Local API</ToggleItem>
				<ToggleItem value={ApiEndpoints.GCP.name}>Cloud API</ToggleItem>
			</ToggleGroup.Root>
		</div>
	);
}

export default ApiSelector;
