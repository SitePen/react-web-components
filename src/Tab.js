import React from 'react';
import PropTypes from 'prop-types';
import './web-components/Tab';

let idIndex = 0;

export const Tab = props => (
	<x-tab
		{...props}
		tabId={props.tabId || `tab-unique-id-${++idIndex}`}>
		{props.children}
	</x-tab>
);

Tab.propTypes = {
	title: PropTypes.string,
	tabId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	closable: PropTypes.bool
};

export default Tab;
