import React, { Component } from 'react';
import Tab from './Tab';
import Tabs from './Tabs';

let keyVal = 0;

export class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabs: [
				this.createTab(0),
				this.createTab(1)
			]
		};
	}

	createTab(index = this.state && this.state.tabs ? this.state.tabs.length : 0) {
		const tabNumber = `${index + 1}`.padStart(2, '0');
		return (
			<Tab title={`Tab ${tabNumber}`} key={++keyVal}>
				Tab Content {tabNumber}
			</Tab>
		);
	}

	onAddTab = () => {
		this.setState({ tabs: [ ...this.state.tabs, this.createTab() ] });
	};

	onRemoveTab = () => {
		const tabs = this.state.tabs;
		const newTabs = tabs.slice(1);
		console.log({oldTabs: tabs, newTabs});

		this.setState({ tabs: newTabs });
	};

	render() {
		return (
			<div>
				<button onClick={this.onAddTab}>Add Tab</button>
				<button onClick={this.onRemoveTab}>Remove Tab</button>
				<Tabs>
					{this.state.tabs}
				</Tabs>
			</div>
		);
	}
}

export default App;
