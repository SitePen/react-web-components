// import React from 'react';
// import ReactDOM from 'react-dom';
import { Tabs } from './web-components/tabs';

customElements.define('x-tabs', Tabs);

const el = document.createElement('x-tabs');
document.getElementById('root').appendChild(el);

console.log('hello world!');

module.hot.accept();
