export class Tabs extends HTMLElement {
	tabsTemplate = `
		<ul role="tablist"></ul>
		<div><content></content></div>
	`;

	tabTemplate = `
		<li role="presentation">
			<a href="#" role="tab" data-toggle="tab"></a>
			<a href="#" class="close">X</a>
		</li>
	`;

	selected = null;
	tabMap = new Map(); // holds <x-tab>
	panelMap = new WeakMap(); // holds li
	displayMap = new WeakMap(); // holds css display status

	connectedCallback() {
		const el = document.createElement('div');
		el.innerHTML = this.tabsTemplate;
		this.insertBefore(el, this.firstChild);

		this.createTabs();

		this.querySelector('ul').addEventListener('click', this);

		this.querySelector('ul').classList.add('nav', 'nav-tabs');

		if (!this.mutationObserver) {
			this.mutationObserver = new MutationObserver(this.handleMutations);
			this.mutationObserver.observe(this, { childList: true, attributes: true });
		}
	}

	disconnectedCallback() {
		this.querySelector('ul').removeEventListener('click', this);
	}

	handleEvent = ({target}) => {
		if (target.tagName === 'A') {
			if (target.classList.contains('close')) {
				this.closeTab(target.parentNode);
			} else {
				this.setTabStatus(target.parentNode);
			}
		}
	};

	attributeChangedCallback(attrName, oldVal, newVal) {
		if (attrName === 'class') {
			this.querySelector('ul').className = newVal;
		}
	}

	closeTab = (node) => {
		const tab = this.tabMap.get(node);
		tab.parentElement.removeChild(tab);
		// const { tabMap, panelMap } = this;
		// const tab = tabMap.get(node);
		// const panel = panelMap.get(tab);
		// tabMap.delete(node);
		// tab.parentElement.removeChild(tab);
		// panel.parentElement.removeChild(panel);
	};

	handleMutations = (mutations) => {
		const handlers = [];
		mutations.forEach(({type, addedNodes, removedNodes}) => {
			if (type === 'childList') {
				[...addedNodes].forEach(node => handlers.push(['add', node]));
				[...removedNodes].forEach(node => handlers.push(['remove', node]));
			}
		});

		if (handlers.length) {
			const ul = this.querySelector('ul');
			let tab;
			console.log(`${handlers.length} changes`, handlers);
			handlers.forEach(([action, node]) => {
				if (node.nodeName !== 'X-TAB') {
					return;
				}

				if (action === 'add') {
					tab = this.makeTab(node);
					this.tabMap.set(tab, node);
					this.panelMap.set(node, tab);

					if (node.attributes.active) {
						this.tabMap.forEach((value, key) => {
							const fn = tab === key ? this.makeActive : this.makeInactive;
							fn(key);
						});
					} else {
						this.makeInactive(tab);
					}
					ul.appendChild(tab);
				} else {
					tab = this.panelMap.get(node);
					tab.parentNode.removeChild(tab);
					this.panelMap.delete(node);
					this.tabMap.delete(tab);
					this.displayMap.delete(tab);

					if (node.attributes.active) {
						const last = ul.querySelector('li:last-child');
						this.setTabStatus(last);
					}
				}
			});
		}
	};

	handleTitle = (panel) => {
		const tab = this.panelMap.get(panel);

		if (tab) {
			tab.textContent = panel.title;
		}
	};

	createTabs = () => {
		const ul = this.querySelector('ul');
		const tabs = [...this.querySelectorAll('x-tab')];
		tabs.forEach((node, index) => {
			const tab = this.makeTab(node);
			ul.appendChild(tab);
			this.tabMap.set(tab, node);
			this.panelMap.set(node, tab);

			if (index === 0) {
				this.makeActive(tab);
			} else {
				node.style.display = 'none';
			}
		});
	};

	makeTab = (node) => {
		const el = document.createElement('div');
		el.innerHTML = this.tabTemplate;
		const tab = el.firstElementChild;
		const tabAnchor = tab.firstElementChild;
		tabAnchor.innerHTML = node.attributes && node.attributes.title ? 
			node.attributes.title.value : node.title;
		this.displayMap.set(node, node.style.display);
		return tab;
	};

	makeActive = (tab) => {
		tab.classList.add('active');
		const node = this.tabMap.get(tab);
		const naturalDisplay = this.displayMap.get(node);
		node.style.display = naturalDisplay;
		node.setAttribute('active', '');
	};

	makeInactive = (tab) => {
		tab.classList.remove('active');
		const node = this.tabMap.get(tab);
		node.style.display = 'none';
		node.removeAttribute('active');
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
