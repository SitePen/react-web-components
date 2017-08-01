import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './web-components/Tab';

export class Tab extends Component {
	static propTypes = {
		title: PropTypes.string,
		closable: PropTypes.bool
	};

	constructor(props) {
		super(props);
		this.tabId = this.tabId || Date.now();
	}

	_handleRef = (component) => this.component = component;

	render() {
		return (
			<x-tab
				{...this.props}
				ref={this._handleRef}
				data-tab-id={this.tabId}>
				{this.props.children}
			</x-tab>
		);
	}
}

export default Tab;
