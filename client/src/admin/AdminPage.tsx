import { useApiEndpoint } from "@/Context";

export function AdminPage() {
	const [apiEndpoint] = useApiEndpoint();
	const serverInit = async () => {
		const resp = await fetch(`${apiEndpoint.http}/admin/init`);
		console.log(await resp.json());
	};
	const serverReset = async () => {
		const resp = await fetch(`${apiEndpoint.http}/admin/reset`);
		console.log(await resp.json());
	};

	return (
		<div>
			<button onClick={serverInit}>Server init</button>
			<button onClick={serverReset}>Clear storage</button>
		</div>
	);
}
