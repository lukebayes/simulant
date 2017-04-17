import createEvent from './create_event.js';

function simulant(window, type, params = {}) {
	return createEvent(window, type, params);
}

simulant.fire = function(elementOrDocument, typeOrEvent, params) {
	const windowFromElementOrDocument = elementOrDocument && (elementOrDocument.ownerDocument && elementOrDocument.ownerDocument.defaultView || elementOrDocument.defaultView);
	const event = typeof typeOrEvent === 'string' ? createEvent(windowFromElementOrDocument, typeOrEvent, params) : typeOrEvent;

	elementOrDocument.dispatchEvent(event);
	return event;
};

export default simulant;
