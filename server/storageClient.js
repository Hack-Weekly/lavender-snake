const {Storage} = require('@google-cloud/storage');

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

const storage = new Storage();

class storageClient {
	constructor() {
		console.log(process.env.NODE_ENV);
		this.isProd = process.env.NODE_ENV === 'production';
		if (this.isProd) {
			this.bucket = storage.bucket('lavender-snake-todos')
		}
	}
	
	async load(id) {
		if (this.isProd) {
			console.log('creating file')
			const file = this.bucket.file(id)
			console.log('checking exists')
			if ((await file.exists())[0]) {
				console.log('exists')
				return JSON.parse((await file.download()).toString());
			}

			return [];
		} else {
			// dev
			return inMemoryStorage[id] || [];
		}
	}

	async save(id, o) {
		if (this.isProd) {
			await this.bucket.file(id).save(JSON.stringify(o));
		} else {
			// dev
			inMemoryStorage[id] = o;
		}
		
	}
}

const client = new storageClient();
module.exports = client;