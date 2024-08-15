const { connectToMongo } = require('./mongoClient');
const { cache } = require('./cacheManager');
const EventEmitter = require('events');
const BhaiClientError = require('./errorManager');

class BhaiClient extends EventEmitter {
constructor(options = {}) {
super();
this.mongoConfigs = options.mongoConfigs || [];
this.cache = cache;
this.logger = options.logger || console.log;
this.errorHandler = options.errorHandler || ((error) => console.error(error.message));
this.dbs = [];
}

async connectToMongo() {
this.dbs = await connectToMongo(this.mongoConfigs, this.logger, this.errorHandler);
if (this.dbs.length === 0) {
throw new BhaiClientError('No MongoDB instances connected successfully');
}
}

async getData(collectionName, key) {
let data = this.cache.get(key);
if (!data) {
this.emit('cacheMiss', key);
for (let db of this.dbs) {
data = await db.collection(collectionName).findOne({ key });
if (data) {
this.cache.set(key, data);
break;
}
}
}
this.emit('get', key, data);
return data;
}

async setData(collectionName, key, value) {
const data = { key, value };
for (let db of this.dbs) {
await db.collection(collectionName).updateOne({ key }, { $set: data }, { upsert: true });
}
this.cache.set(key, data);
this.emit('set', key, data);
return data;
}

async deleteData(collectionName, key) {
for (let db of this.dbs) {
await db.collection(collectionName).deleteOne({ key });
}
this.cache.del(key);
this.emit('delete', key);
return { success: true };
}
}

module.exports = BhaiClient;