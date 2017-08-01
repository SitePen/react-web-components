import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import './web-components/tabs';

export class Tabs extends Component {
	static propTypes = {
		onTabClosed: PropTypes.func
	};

	componentDidMount() {
		this.component.addEventListener('tabclosed', this.onTabClosed);
	}

	componentWillUnmount() {
		this.component.removeEventListener('tabclosed', this.onTabClosed);
	}

	onTabClosed = ({detail: component}) => {
		this.props.onTabClosed && this.props.onTabClosed(component.getAttribute('tabId'));
	};

	_handleRef = (component) => {
		this.component = component;
	};

	render() {
		return (
			<x-tabs ref={this._handleRef}>
				{Children.map(this.props.children, tab =>
					<span key={tab.props.title} ref={this._handleChildrenRefs}>
						{tab}
					</span>
				)}
			</x-tabs>
		);
	}
}

export default Tabs;
