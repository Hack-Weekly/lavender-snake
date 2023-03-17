const {Storage} = require('@google-cloud/storage');
const { inMemoryDB } = require('./chat/dummyData/dummyThreads');

// TODO: this whole file needs work, just copied over from previous project

const storage = new Storage();

class storageClient {
	constructor() {
		console.log(process.env.NODE_ENV);
		this.isProd = process.env.NODE_ENV === 'production';
		if (this.isProd) {
			this.bucket = storage.bucket('lavender-snake-chat')
		}
	}
	
	async load(id) {
		if (this.isProd) {
			const file = this.bucket.file(id)
			if ((await file.exists())[0]) {
				return JSON.parse((await file.download()).toString());
			}

			return [];
		} else {
			// dev
			return inMemoryDB[id] || [];
		}
	}

	async save(id, o) {
		if (this.isProd) {
			await this.bucket.file(id).save(JSON.stringify(o));
		} else {
			// dev
			inMemoryDB[id] = o;
		}
		
	}
}

const client = new storageClient();
module.exports = client;