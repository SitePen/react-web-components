import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import vdom from 'react-vdom';
import Tabs from "./Tabs";
import Tab from "./Tab";

function makeWebComponentExample(root) {
	const title = document.createElement('h2');
	title.textContent = 'Web Component Example';

	const el = document.createElement('div');
	el.innerHTML = `
		<x-tabs>
			<x-tab title="Tab 01" closable>
				<div>
					<h3>Tab 01 Content</h3>
				</div>
			</x-tab>
			<x-tab title="Tab 02">
				<div>
					<h3>Tab 02 Content</h3>
				</div>
			</x-tab>
		</x-tabs>
	`;
	root.appendChild(title);
	root.appendChild(el);
}

function makeReactExample(root) {
	const app = <App/>;

	const inspectButton = document.createElement('button');
	inspectButton.textContent = 'Inspect';

	const title = document.createElement('h2');
	title.textContent = 'React Example';

	const el = document.createElement('div');

	inspectButton.addEventListener('click', () => {
		console.log(vdom(app).children[2]);
	});
	root.appendChild(title);
	root.appendChild(inspectButton);
	root.appendChild(el);
	ReactDOM.render(app, el);
}

function makeSimpleReactExample(root) {
	ReactDOM.render(
		<Tabs>
			<Tab closable={true} title="Tab 01"><h3>Tab 01 Content</h3></Tab>
			<Tab title="Tab 02"><h3>Tab 02 Content</h3></Tab>
		</Tabs>, root);
}

const webComponentsRoot = document.getElementById('web-components-root');
const reactRoot = document.getElementById('react-root');
const simpleReactRoot = document.getElementById('simple-react-root');
makeWebComponentExample(webComponentsRoot);
makeReactExample(reactRoot);
makeSimpleReactExample(simpleReactRoot);

module.hot.accept();
