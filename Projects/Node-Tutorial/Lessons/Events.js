let events = require('events');

let listenerCallback = (data) => {
    console.log('Celebrate ' + data);
}

let listenerCallbackHello = (data) => {
    console.log('Hello ' + data);
}

let myEmitter = new events.EventEmitter();

myEmitter.on('celebration', listenerCallback);
myEmitter.addListener('hello', listenerCallbackHello);

myEmitter.emit('celebration','Hello')
myEmitter.emit('hello','Celebration')

console.log('----No Hello event emitted')
myEmitter.removeListener('hello', listenerCallbackHello);
myEmitter.emit('celebration','Hello')
myEmitter.emit('hello','Celebration')

console.log('----No celebration event emitted')
myEmitter.off('celebration', listenerCallback);
myEmitter.emit('celebration','Hello')
myEmitter.emit('hello','Celebration')