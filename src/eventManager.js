const EventEmitter = require('events');
class EventManager extends EventEmitter {}

module.exports = new EventManager();
