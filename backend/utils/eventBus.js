const EventEmitter = require('events');

class EventBus extends EventEmitter {}

// Tek bir instance oluştur ve export et
const eventBus = new EventBus();
module.exports = eventBus;