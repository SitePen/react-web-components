// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from "./App";
import './web-components/Tab';
import './web-components/Tabs';

document.getElementById('root').innerHTML = `
	<x-tabs>
		<x-tab title="Tab 01">
			<div>
				<h1>Tab 01 Content</h1>
			</div>
		</x-tab>
		<x-tab title="Tab 02">
			<div>
				<h1>Tab 02 Content</h1>
			</div>
		</x-tab>
	</x-tabs>
`;

module.hot.accept();
