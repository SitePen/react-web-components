export class Tabs extends HTMLElement {
	static observedAttributes = [ 'class' ];

	selected = null;
	tabMap = new Map(); // holds [li, x-tab]
	paneMap = new WeakMap(); // holds [x-tab, li]
	displayMap = new WeakMap(); // holds css display status

	connectedCallback() {
		const el = document.createElement('ul');
		el.setAttribute('role', 'tablist');
		el.classList.add('nav', 'mav-tabs');

		this.insertBefore(el, this.firstChild);

		this.createTabs();

		el.addEventListener('click', this);

		if (!this.mutationObserver) {
			this.mutationObserver = new MutationObserver(this.handleMutations);
			this.mutationObserver.observe(this, { childList: true, subtree: true });
		}
	}

	disconnectedCallback() {
		this.querySelector('ul').removeEventListener('click', this);
		this.mutationObserver.disconnect();
		this.mutationObserver = null;
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		if (attrName === 'class') {
			this.querySelector('ul').className = newVal;
		}
	}

	handleEvent = ({target}) => {
		if (target.classList.contains('close')) {
			this.closeTab(target.parentNode);
		} else if (target.tagName === 'A') {
			this.setTabStatus(target.parentNode);
		}
	};

	closeTab = (tab) => {
		const pane = this.tabMap.get(tab);
		pane.parentElement.removeChild(pane);
		this.dispatchEvent(new CustomEvent('tabclosed', {detail: pane}));
	};

	_addTab(pane) {
		const ul = this.querySelector('ul');
		const tab = this.makeTab(pane);
		this.tabMap.set(tab, pane);
		this.paneMap.set(pane, tab);

		if (pane.hasAttribute('active')) {
			this.tabMap.forEach((value, key) => {
				if (tab === key) {
					this.makeActive(key);
				} else {
					this.makeInactive(key)
				}
			});
		} else {
			this.makeInactive(tab);
		}
		ul.appendChild(tab);
	}

	_removeTab(pane) {
		const tab = this.paneMap.get(pane);
		tab.parentNode.removeChild(tab);
		this.paneMap.delete(pane);
		this.tabMap.delete(tab);
		this.displayMap.delete(tab);

		if (pane.hasAttribute('active')) {
			const last = this.querySelector('ul li:last-child');
			this.setTabStatus(last);
		}
	}

	handleMutations = (mutations) => {
		const handlers = [];
		mutations.forEach(({type, addedNodes, removedNodes}) => {
			if (type === 'childList') {
				[...addedNodes].forEach(node => handlers.push(['add', node]));
				[...removedNodes].forEach(node => handlers.push(['remove', node]));
			}
		});

		handlers.forEach(([action, pane]) => {
			if (pane.nodeName !== 'X-TAB') {
				pane = pane.querySelector('x-tab');
				if (!pane) {
					return;
				}
			}

			if (action === 'add') {
				this._addTab(pane);
			} else {
				this._removeTab(pane);
			}
		});
	};

	handleTitle = (panel) => {
		const tab = this.paneMap.get(panel);

		if (tab) {
			tab.textContent = panel.title;
		}
	};

	createTabs = () => {
		const ul = this.querySelector('ul');
		const panes = [...this.querySelectorAll('x-tab')];
		panes.forEach((pane, index) => {
			const tab = this.makeTab(pane);
			ul.appendChild(tab);
			this.tabMap.set(tab, pane);
			this.paneMap.set(pane, tab);

			if (index === 0) {
				this.makeActive(tab);
			} else {
				pane.style.display = 'none';
			}
		});
	};

	makeTabCloseButton = () => {
		const closeButton = document.createElement('button');
		closeButton.classList.add('close');
		closeButton.textContent = 'X';
		return closeButton;
	};

	handleClosable = (pane, tab = this.paneMap.get(pane)) => {
		if (!tab) {
			return;
		}

		const button = tab.querySelector('button.close');

		if (!button && pane.hasAttribute('closable')) {
			tab.appendChild(this.makeTabCloseButton());
		} else if (button && !pane.hasAttribute('closable')) {
			tab.removeChild(button);
		}
	};

	makeTab = (pane) => {
		const tab = document.createElement('li')
		tab.setAttribute('role', 'presentation');

		const tabLink = document.createElement('a');
		tabLink.href = '#';
		tabLink.setAttribute('role', 'tab');
		tabLink.setAttribute('data-toggle', 'tab');
		tab.appendChild(tabLink);

		this.handleClosable(pane, tab);

		tabLink.textContent = pane.getAttribute('title') || pane.title;
		this.displayMap.set(pane, pane.style.display);
		return tab;
	};

	makeActive = (tab) => {
		tab.classList.add('active');
		const pane = this.tabMap.get(tab);
		const naturalDisplay = this.displayMap.get(pane);
		pane.style.display = naturalDisplay;
		pane.setAttribute('active', '');
	};

	makeInactive = (tab) => {
		tab.classList.remove('active');
		const pane = this.tabMap.get(tab);
		pane.style.display = 'none';
		pane.removeAttribute('active');
	};

	setTabStatus = (active) => {
		if (active === this.selected) {
			return;
		}

		this.selected = active;

		const tabs = [...this.querySelector('ul').children];
		tabs.forEach(tab => {
			const fn = active === tab ? this.makeActive : this.makeInactive;
			fn(tab);
		});
	};
}

customElements.define('x-tabs', Tabs);
