import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import { Tabs } from './web-components/tabs';

customElements.define('x-tabs', Tabs);

ReactDOM.render(<App/>, document.getElementById('root'));

// const el = document.createElement('x-tabs');
// document.getElementById('root').appendChild(el);

module.hot.accept();
