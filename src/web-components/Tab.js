export class Tab extends HTMLElement {
	static observedAttributes = [ 'title', 'closable' ];

	connectedCallback() {
		this.setAttribute('role', 'tabpanel');
		this.closable = this.hasAttribute('closable');
	}

	attributeChangedCallback(name, oldVal, newVal) {
		const parent = this.parentNode;
		if (parent) {
			if (name === 'title' && parent.handleTitle) {
				parent.handleTitle(this, newVal);
			} else if (name === 'closable' && parent.handleClosable) {
				parent.handleClosable(this);
			}
		}
	}

	get closable() {
		return this.hasAttribute('closable');
	}

	set closable(value) {
		if (value) {
			this.setAttribute('closable', '');
		} else {
			this.removeAttribute('closable');
		}
	}

	get title() {
		return this.getAttribute('title');
	}

	set title(value) {
		this.setAttribute('title', value);
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
