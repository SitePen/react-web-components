import React, { Component, PropTypes } from 'react';
import './web-components/Tab';

export class Tab extends Component {
	static propTypes = {
		title: PropTypes.string
	};

	render() {
		return (
			<x-tab {...this.props}>
				{this.props.children}
			</x-tab>
		);
	}
}

export default Tab;
