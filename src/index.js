import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import vdom from 'react-vdom';

function makeWebComponentExample(root) {
	const title = document.createElement('h2');
	title.textContent = 'Web Component Example';

	const el = document.createElement('div');
	el.innerHTML = `
		<x-tabs>
			<x-tab title="Tab 01">
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

const webComponentsRoot = document.getElementById('web-components-root');
const reactRoot = document.getElementById('react-root');
makeWebComponentExample(webComponentsRoot);
makeReactExample(reactRoot);

module.hot.accept();
