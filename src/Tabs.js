import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import './web-components/tabs';

export class Tabs extends Component {
	static propTypes = {
		onTabRemove: PropTypes.func
	};

	_tabMap = new WeakMap();

	componentDidMount() {
		this.component.addEventListener('tabremove', this.onTabRemove);
	}

	componentWillUnmount() {
		this.component.removeEventListener('tabremove', this.onTabRemove);
	}

	getTabById(tabId) {
		return this.getChildren().find(tab => tabId == tab.tabId);
	}

	getTabByNode(node) {
		return this.getChildren().find(tab => tab.component === node);
	}

	getChildren() {
		return Children.toArray(this.props.children);
	}

	onTabRemove = ({detail: component}) => {
		const tab = this._tabMap.get(component);
		this.props.onTabRemove && this.props.onTabRemove(tab);
	};

	_handleRef = (component) => {
		this.component = component;
	};

	_cloneTab = (tab) => {
		const newTab = cloneElement(tab, {
			ref: component => {
				if (component) {
					const tab = component.component;
					this._tabMap.set(tab, component);
				}
			}
		});

		return newTab;
	};

	render() {
		const children = this.getChildren();
		return (
			<x-tabs ref={this._handleRef}>
				{children.map((tab, i) =>
					<span key={tab.key || i} ref={this._handleChildrenRefs}>
						{this._cloneTab(tab)}
					</span>
				)}
			</x-tabs>
		);
	}
}

export default Tabs;
