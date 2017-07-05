# poly-lifecycle

[![Buy Me a Coffee](http://static.tonybogdanov.com/github/coffee.svg)](http://ko-fi.co/1236KUKJNC96B)

Provides a family of utilities for better WebComponents / Polymer 2.* lifecycle management.

## Dependencies

Element dependencies are managed via [Bower](http://bower.io/). You can
install that via:

    npm install -g bower

And init your project with:

    bower init

## Installation

Install the component with:

    bower install --save poly-lifecycle

## Listening for events

### DOMContentLoaded

To hook an action to be executed once the DOM is ready use:

    TB.Lifecycle.onDOMReady(callback);
    
If the DOM is already loaded the `callback` will be executed immediately.

### WebComponentsReady

To hook an action to be executed once the `WebComponentsReady` event has fired use:

    TB.Lifecycle.onWCReady(callback);
    
If the event has already fired the `callback` will be executed immediately.

### Combined

To hook an action to be executed once both of the above events have fired use:

    TB.Lifecycle.onReady(callback);
    
If both have already fired the `callback` will be executed immediately.