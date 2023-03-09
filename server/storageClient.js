// This is meant to represent k-v storage as can be found in things like blob storage
const inMemoryStorage = {
	todos: [
		{
			id: '83e6c89f-bfe2-4cc0-b3da-0d0688904f82',
			text: "Learn React",
			completed: false,
		},
		{
			id: '550e9bae-8f43-4deb-9a02-c628af6a3f94',
			text: "Learn TypeScript",
			completed: true,
		},
		{
			id: '529baf54-446b-499f-9b29-7206e8be42ed',
			text: "Learn GraphQL",
			completed: false,
		},
	]
}

class storageClient {
	constructor() {}
	
	load(id) {
		return inMemoryStorage[id];
	}

	save(id, o) {
		inMemoryStorage[id] = o;
	}
}

const client = new storageClient();
module.exports = client;