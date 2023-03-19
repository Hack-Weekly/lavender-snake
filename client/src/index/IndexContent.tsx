import { css } from "@emotion/react";
import { colors } from "@/branding";
import { Link } from "react-router-dom";

const breakpoints = [576, 768, 992, 1200];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

const styles = {
	container: css({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		overflow: "scroll",
	}),

	logoContainer: css({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "2rem",
		marginBottom: "2rem",

		[mq[2]]: {
			flexDirection: "row",
		},
	}),

	logoImg: css({
		width: "40%",
		height: "40%",

		[mq[2]]: {
			width: "20%",
			height: "20%",
		},
	}),

	logoText: css({
		fontSize: "2rem",

		[mq[2]]: {
			fontSize: "5rem",
		},
	}),

	projectsContainer: css({
		display: "grid",
		gridTemplateColumns: "1fr",
		gap: "2rem",

		[mq[2]]: {
			gridTemplateColumns: "1fr 1fr",
		},
	}),

	projectCard: css({
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		maxWidth: "25rem",
		border: "1px solid transparent",
		textDecoration: "none",
		"&:visited": {
			color: "white",
		},
		"&:hover": {
			border: `1px solid ${colors.highlight}`,
		},
	}),

	projectImg: css({
		width: "100%",
	}),

	projectTitle: css({
		fontSize: "2rem",
	}),
};

const IndexContent = () => {
	return (
		<div css={styles.container}>
			<div css={styles.logoContainer}>
				<img
					css={styles.logoImg}
					src={"/lavender-snake.png"}
					alt="lavender snake logo"
				/>

				<h1 css={styles.logoText}>Lavender Snake</h1>
			</div>

			<div css={styles.projectsContainer}>
				<Link to={"/todo"} css={styles.projectCard}>
					<img
						css={styles.projectImg}
						src="/lavender-snake-todo.png"
						alt="lavender snake todo app"
					/>
					<h2 css={styles.projectTitle}>Todo</h2>
				</Link>
				<Link to={"/chat"} css={styles.projectCard}>
					<img
						css={styles.projectImg}
						src="/coming-soon.jpg"
						alt="lavender snake chat app"
					/>
					<h2 css={styles.projectTitle}>Chat</h2>
				</Link>
			</div>
		</div>
	);
};

export default IndexContent;
