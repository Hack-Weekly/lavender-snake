import { useEffect, useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="App">
			<EmotionTest />
			<EmotionTestTwo />
			<ServerData />
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
			</div>
		</div>
	);
}

function EmotionTest() {
	return <div css={{ backgroundColor: "red" }}>Hello, Emotion!</div>;
}

function EmotionTestTwo() {
	return <div css={{ backgroundColor: "blue" }}>Hello, by MagicBeam</div>;
}

function ServerData() {
	const [serverCount, setServerCount] = useState("Loading...");
	useEffect(() => {
		fetch("http://localhost:3000/count")
			.then((res) => res.json())
			.then((resp) => {
				console.log(resp);
				setServerCount(`Server count is: ${resp.count}`);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <div>{serverCount}</div>;
}

export default App;
