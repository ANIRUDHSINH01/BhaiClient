
# BhaiClient Package Documentation

[![npm version](https://img.shields.io/npm/v/bhaiclient.svg)](https://www.npmjs.com/package/bhaiclient)

## Overview

`BhaiClient` is a versatile and efficient solution for applications needing fast, reliable, and persistent data storage using MongoDB and in-memory caching.

## Installation

```bash
npm install bhaiclient
```

## Getting Started

### Importing and Initializing

```javascript
import BhaiClient from 'bhaiclient';

const client = new BhaiClient({
  mongoConfigs: [{ uri: 'your_mongo_connection_string', dbName: 'your_database_name' }],
  ttl: 3600, // Time-to-Live for cache entries in seconds
  logger: (message) => console.log('LOG:', message),
  errorHandler: (error) => console.error('ERROR:', error.message)
});
```

### Connecting to MongoDB

```javascript
(async () => {
  await client.connectToMongo();
})();
```

## API Reference

### 1. `connectToMongo()`

Connects to the MongoDB instances specified in the configuration.

```javascript
await client.connectToMongo();
```

### 2. `getData(collectionName, key)`

Retrieves data from the cache or MongoDB.

- **collectionName**: The name of the MongoDB collection.
- **key**: The key to retrieve.

```javascript
const data = await client.getData('your_collection', 'testKey');
console.log(data);
```

### 3. `setData(collectionName, key, value)`

Sets data in the cache and MongoDB.

- **collectionName**: The name of the MongoDB collection.
- **key**: The key to set.
- **value**: The value to set.

```javascript
await client.setData('your_collection', 'testKey', { some: 'data' });
```

### 4. `deleteData(collectionName, key)`

Deletes data from the cache and MongoDB.

- **collectionName**: The name of the MongoDB collection.
- **key**: The key to delete.

```javascript
await client.deleteData('your_collection', 'testKey');
```

## Example Scenarios

### Real-Time Applications (Chat Application)

```javascript
import BhaiClient from 'bhaiclient';

(async () => {
const client = new BhaiClient({
    mongoConfigs: [{ uri: 'your_mongo_connection_string', dbName: 'your_database_name' }],
    ttl: 3600, // 1 hour TTL for chat messages
    logger: (message) => console.log('LOG:', message),
    errorHandler: (error) => console.error('ERROR:', error.message)
  });

  await client.connectToMongo();

  // Set chat message
  await client.setData('chat', 'message123', { from: 'user123', to: 'user456', message: 'Hello!' });

  // Get chat message
  const message = await client.getData('chat', 'message123');
  console.log('Chat Message:', message);

  // Delete chat message
  await client.deleteData('chat', 'message123');
})();
```

### IoT (Sensor Data)

```javascript
import BhaiClient from './src/index';

(async () => {
  const client = new BhaiClient({
    mongoConfigs: [{ uri: 'your_mongo_connection_string', dbName: 'your_database_name' }],
    ttl: 600, // 10 minutes TTL for sensor data
    logger: (message) => console.log('LOG:', message),
    errorHandler: (error) => console.error('ERROR:', error.message)
  });

  await client.connectToMongo();

  // Set sensor data
  await client.setData('sensors', 'sensor123', { temperature: 22.5, humidity: 60 });

  // Get sensor data
  const sensorData = await client.getData('sensors', 'sensor123');
  console.log('Sensor Data:', sensorData);

  // Delete sensor data
  await client.deleteData('sensors', 'sensor123');
})();
```

### E-commerce (User Cart)

```javascript
import BhaiClient from './src/index';

(async () => {
  const client = new BhaiClient({
    mongoConfigs: [{ uri: 'your_mongo_connection_string', dbName: 'your_database_name' }],
    ttl: 86400, // 1 day TTL for user carts
    logger: (message) => console.log('LOG:', message),
    errorHandler: (error) => console.error('ERROR:', error.message)
  });

  await client.connectToMongo();

  // Set user cart
  await client.setData('carts', 'user123', { items: [{ productId: 'prod123', quantity: 2 }] });

  // Get user cart
  const cart = await client.getData('carts', 'user123');
  console.log('User Cart:', cart);

  // Delete user cart
  await client.deleteData('carts', 'user123');
})();
```

## Events

### `set`

Emitted when data is set.

```javascript
client.on('set', (key, data) => {
  console.log(`Data set for key: ${key}`, data);
});
```

### `get`

Emitted when data is retrieved.

```javascript
client.on('get', (key, data) => {
  console.log(`Data retrieved for key: ${key}`, data);
});
```

### `delete`

Emitted when data is deleted.

```javascript
client.on('delete', (key) => {
  console.log(`Data deleted for key: ${key}`);
});
```

### `cacheMiss`


Emitted when a cache miss occurs.

```javascript
client.on('cacheMiss', (key) => {
  console.log(`Cache miss for key: ${key}`);
});
```

## Performance

`BhaiClient` package ki performance kaafi depend karti hai aapke use case, hardware, network latency aur data volume par. Lekin overall, yeh package fast aur efficient hai kyunki yeh in-memory caching aur MongoDB ka combination use karta hai.

### Expected Performance

- **setData**: Typically takes a few milliseconds, depending on MongoDB write speed.
- **getData**: If data is in cache, it takes less than 1 millisecond. If data is fetched from MongoDB, it takes a few milliseconds.
- **deleteData**: Typically takes a few milliseconds, depending on MongoDB delete speed.

### Improving Performance

1. **Optimize MongoDB Indexing**: Ensure that your MongoDB collections have appropriate indexes to speed up queries.
2. **Increase Cache TTL**: Increase the Time-to-Live (TTL) for cache entries to reduce the frequency of fetching data from MongoDB.
3. **Use Efficient Data Structures**: Use efficient data structures and algorithms to manage data within your application.
4. **Monitor Performance**: Use monitoring tools to track the performance of your MongoDB cluster and in-memory cache.

