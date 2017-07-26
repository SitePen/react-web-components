import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import vdom from 'react-vdom';

// import './web-components/Tab';
// import './web-components/Tabs';

// document.getElementById('root').innerHTML = `
// 	<x-tabs>
// 		<x-tab title="Tab 01">
// 			<div>
// 				<h1>Tab 01 Content</h1>
// 			</div>
// 		</x-tab>
// 		<x-tab title="Tab 02">
// 			<div>
// 				<h1>Tab 02 Content</h1>
// 			</div>
// 		</x-tab>
// 	</x-tabs>
// `;

const app = <App/>;

document.getElementById('vdom').addEventListener('click', () => {
	console.log(vdom(app));
});
ReactDOM.render(app, document.getElementById('root'));
module.hot.accept();
