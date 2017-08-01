import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import './web-components/tabs';

export class Tabs extends Component {
	static propTypes = {
		onTabRemove: PropTypes.func
	};

	componentDidMount() {
		this.component.addEventListener('tabremove', this.onTabRemove);
	}

	componentWillUnmount() {
		this.component.removeEventListener('tabremove', this.onTabRemove);
	}

	getChildren() {
		return Children.toArray(this.props.children);
	}

	onTabRemove = ({detail: component}) => {
		this.props.onTabRemove && this.props.onTabRemove(component.getAttribute('tabId'));
	};

	_handleRef = (component) => {
		this.component = component;
	};

	render() {
		const children = this.getChildren();
		return (
			<x-tabs ref={this._handleRef}>
				{children.map(tab =>
					<span key={tab.props.title} ref={this._handleChildrenRefs}>
						{tab}
					</span>
				)}
			</x-tabs>
		);
	}
}

export default Tabs;
