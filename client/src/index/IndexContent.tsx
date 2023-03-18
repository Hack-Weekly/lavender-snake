import { css } from "@emotion/react";
import { colors } from "@/colors";

const styles = {
	container: css({
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		maxHeight: "100vh",
	}),

	logoContainer: css({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: "2rem",
		marginBottom: "2rem",
	}),

	logoImg: css({
		width: "20%",
		height: "20%",
	}),

	logoText: css({
		fontSize: "5rem",
	}),

	projectsContainer: css({
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "2rem",
		overflow: "scroll",
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
				<a href={"/todo"} css={styles.projectCard}>
					<img
						css={styles.projectImg}
						src="/lavender-snake-todo.png"
						alt="lavender snake todo app"
					/>
					<h2 css={styles.projectTitle}>Todo</h2>
				</a>

				<a href={"/chat"} css={styles.projectCard}>
					<img
						css={styles.projectImg}
						src="/coming-soon.jpg"
						alt="lavender snake chat app"
					/>
					<h2 css={styles.projectTitle}>Chat</h2>
				</a>
			</div>
		</div>
	);
};

export default IndexContent;
