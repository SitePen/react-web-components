import React, { Component } from 'react';
import Tab from './Tab';
import Tabs from './Tabs';

let keyVal = 0;

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				this.createTab({closable: true}),
				this.createTab(),
				this.createTab({closable: true})
			]
		};
	}

	createTab(props = {}) {
		const index = ++keyVal;
		const tabNumber = `${index + 1}`.padStart(2, '0');
		return (
			<Tab {...props} title={`Tab ${tabNumber}`} key={index} tabId={index}>
				<h3>Tab Content {tabNumber}</h3>
			</Tab>
		);
	}

	addTab = () => {
		this.setState({ tabs: [ ...this.state.tabs, this.createTab() ] });
	};

	removeTab = () => {
		this.setState({ tabs: [ ...this.state.tabs.slice(1) ] });
	};

	onRemoveTab = (tabId) => {
		const tabs = this.state.tabs.filter(tab => tab.props.tabId != +tabId);
		console.log(tabs);
		this.setState({ tabs });
	};

	render() {
		return (
			<div>
				<button onClick={this.addTab}>Add Tab</button>
				<button onClick={this.removeTab}>Remove Tab</button>
				<Tabs onTabRemove={this.onRemoveTab}>
					{this.state.tabs}
				</Tabs>
			</div>
		);
	}
}

export default App;
