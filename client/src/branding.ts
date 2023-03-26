// Include things here that are 'brand specific'

import { css, keyframes } from "@emotion/react";

export const colors = {
	bgPrimary: "#160020",
	bgSecondary: "#232136",
	accent: "#e6e6fa",
	textPrimary: "#e0def4",
	textSecondary: "#908caa",
	highlight: "#403d52",
	bgChat: "#2a3942",
	bgChatMessage: "#908caa",
	bgChatMessageSelf: "#4F378B",
	chatMessageText: "#000000",
	chatMessageTextSelf: "#ffffff",
	highlight2: "#A7579F",
	errorText: "indianred",
	successText: "springgreen",
};

const shimmer = keyframes({
	from: { backgroundPosition: "top left" },
	to: { backgroundPosition: "top right" },
});

export const brandGradient = css({
	background:
		"linear-gradient(90deg, rgba(140, 81, 165, 1) 0%,rgba(203, 94, 152, 1) 100%)",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
	fontWeight: "1000",
	animation: `${shimmer} 2s ease infinate`,
});
