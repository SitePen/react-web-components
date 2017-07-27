import React, { Component } from 'react';
import './web-components/tabs';

export class Tabs extends Component {
	static propTypes = {
	};

	render() {
		const children = Array.isArray(this.props.children) ? this.props.children : [ this.props.children ];
		return (
			<x-tabs>
				{children.map((tab, i) =>
					<span key={tab.key || i}>
						{tab}
					</span>
				)}
			</x-tabs>
		);
	}
}

export default Tabs;
