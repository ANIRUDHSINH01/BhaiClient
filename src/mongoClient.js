const { MongoClient } = require('mongodb');
const BhaiClientError = require('./errorManager');

async function connectToMongo(mongoConfigs, logger, errorHandler) {
const clients = [];
const dbs = [];
for (let config of mongoConfigs) {
const client = new MongoClient(config.uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
tlsAllowInvalidCertificates: true, // Add this line
tlsAllowInvalidHostnames: true // Add this line
});
try {
await client.connect();
logger(`Connected to MongoDB at ${config.uri}`);
clients.push(client);
dbs.push(client.db(config.dbName));
} catch (error) {
errorHandler(new BhaiClientError(`Failed to connect to MongoDB at ${config.uri}: ${error.message}`));
}
}
return dbs;
}

module.exports = { connectToMongo };


