import modern from './modern.js';

let simulant = {};

simulant.fire = function(element, event, params) {
  if (typeof event === 'string') {
    event = modern(element && element.ownerDocument && element.ownerDocument.defaultView, event, params);
  }

  element.dispatchEvent(event);
  return event;
};

export default simulant;
