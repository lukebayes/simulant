import maps from './maps.js';
import extendWithKeyboardParams from './utils/extendWithKeyboardParams.js';

// NOTE(lbayes): This is some unpleasant global state, but
let resolvedMaps = null;
// import { defaults, eventGroupByType, initialisersByGroup, initialiserParams } from './maps.js';

function createEvent ( window, type, params = {} ) {

	if (!resolvedMaps) {
		resolvedMaps = maps(window);
	}

	let group = resolvedMaps.eventGroupByType[ type ];
	let isKeyboardEvent;

	if ( group === 'KeyboardEvent' ) {
		group = 'Event'; // because you can't fake KeyboardEvents well in any browser
		isKeyboardEvent = true;
	}

	const initialiser = ( resolvedMaps.initialisersByGroup[ group ] || resolvedMaps.initialisersByGroup.Event );

	const Constructor = initialiser[0];
	const method = initialiser[1];

	let extendedParams = {
		bubbles: true, // TODO some events don't bubble?
		cancelable: true
	};

	const paramsList = resolvedMaps.initialiserParams[ method ];
	let i = ( paramsList ? paramsList.length : 0 );

	while ( i-- ) {
		const paramName = paramsList[i];
		extendedParams[ paramName ] = paramName in params ? params[ paramName ] : resolvedMaps.defaults[paramName];
	}

	let event = new Constructor( type, extendedParams );

	if ( isKeyboardEvent ) {
		extendWithKeyboardParams( event, params );
	}

	return event;
}

createEvent.mode = 'modern';

export default createEvent;
