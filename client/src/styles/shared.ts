
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { colors } from "../colors";
import styled from "@emotion/styled";

/*
	I thought why not move out declared styles outside the components, so that they can be reused later on.
	Tbh, I am not a big fan of styled components, why not css modules or just plain css?
	- salat23
 */

export const AppContainer = styled.div`
	font-family: "Outfit", sans-serif;
	box-sizing: border-box;
	min-height: 100vh;
`;

export const BackgroundImage = styled.img`
	opacity: 0.03;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: auto;
	pointer-events: none;
`;

export const MainContent = styled.div`
	min-height: calc(100vh - 5rem);
	display: flex;
	color: #272b33;
`;

export const ToggleItem = styled(ToggleGroup.Item)`
	background-color: ${colors.textSecondary};
	padding: 11px;
	border: 0px;
	&[data-state="on"] {
		background-color: ${colors.accent};
	}

	&:first-of-type {
		border-top-left-radius: 4px;
		border-bottom-left-radius: 4px;
	}

	&:last-child {
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
	}
`;
