import createEvent from './create_event.js';

function simulant(window, type, params = {}) {
	return createEvent(window, type, params);
}

simulant.fire = function(element, typeOrEvent, params) {
	const event = typeof typeOrEvent === 'string' ? createEvent(element && element.ownerDocument && element.ownerDocument.defaultView, typeOrEvent, params) : typeOrEvent;

	element.dispatchEvent(event);
	return event;
};

export default simulant;
