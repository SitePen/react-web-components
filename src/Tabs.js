import React, { Component, PropTypes } from 'react';
import './web-components/tabs';

export class Tabs extends Component {
	static propTypes = {
		onTabAdd: PropTypes.func,
		onTabRemove: PropTypes.func
	};

	componentDidMount() {
		this.component.addEventListener('tabadd', this.onTabAdd);
		this.component.addEventListener('tabremove', this.onTabRemove);
	}

	componentWillUnmount() {
		this.component.removeEventListener('tabadd', this.onTabAdd);
		this.component.removeEventListener('tabremove', this.onTabRemove);
	}

	getTabById(tabId) {
		const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
		return children.find(tab => {
			return tabId === tab.tabId;
		});
	}

	onTabAdd = (event) => {
		const tabId = event.detail.tabId;
		event = Object.assign({}, event, { detail: this.getTabById(tabId) });
		this.props.onAddTab && this.props.onAddTab(event);
	};

	onTabRemove = (event) => {
		const tabId = event.detail.tabId;
		event = Object.assign({}, event, { detail: this.getTabById(tabId) });
		this.props.onTabRemove && this.props.onTabRemove(event);
	};

	_handleRef = (component) => {
		this.component = component;
	}

	render() {
		const children = Array.isArray(this.props.children) ? this.props.children : [ this.props.children ];
		return (
			<x-tabs ref={this._handleRef}>
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
