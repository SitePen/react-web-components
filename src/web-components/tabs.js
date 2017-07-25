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
