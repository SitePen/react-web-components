import React, { Component } from 'react';
import './web-components/tabs';

export class Tabs extends Component {
	static propTypes = {
	};

	render() {
		const children = Array.isArray(this.props.children) ? this.props.children : [ this.props.children ];
		return (
			<x-tabs>
				{children}
			</x-tabs>
		);
	}
}

export default Tabs;
