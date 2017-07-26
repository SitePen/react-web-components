export class Tab extends HTMLElement {
	panelTemplate = `
		<div role="tabpanel">
			<content></content>
		</div>
	`;

	constructor() {
		super();
	}

	connectedCallback() {
		const el = document.createElement('div');
		el.innerHTML = this.panelTemplate;
		this.appendChild(el);
	}

	attributeChangedCallback(name, oldVal, newVal) {
		const parent = this.parentNode;
		if (name === 'title' && parent.handleTitle) {
			parent.handleTitle(this, newVal);
		}
	}

	get title() {
		return this._title;
	}

	set title(value) {
		if (this._title !== value) {
			this._title = value;
			this.setAttribute('title', value);
		}
	}

	get active() {
		return this._active;
	}

	set active(value) {
		if (this._active !== value) {
			this._active = value;
			this.setAttribute('active', value);
		}
	}
}

customElements.define('x-tab', Tab);
