import React, { Component, PropTypes } from 'react';
import './web-components/Tab';

export class Tab extends Component {
	static propTypes = {
		title: PropTypes.string
	};

	constructor(props) {
		super(props);
		this.tabId = this.tabId || Date.now();
	}

	render() {
		return (
			<x-tab
				{...this.props}
				data-tab-id={this.tabId}>
				{this.props.children}
			</x-tab>
		);
	}
}

export default Tab;
