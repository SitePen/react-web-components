// if (typeof HTMLElement !== 'function') {
// 	const _HTMLElement = function () {};
// 	_HTMLElement.prototype = HTMLElement.prototype;
// 	HTMLElement = _HTMLElement;
// }

export class Tabs extends HTMLElement {
	constructor() {
		super();
		console.log('CREATED');
	}

	connectedCallback() {
		console.log('Connected!');
	}

	disconnectedCallback() {
	}

	attributeChangedCallback(/* attrName, oldVal, newVal */) {
	}

	adoptedCallback() {
	}
}
