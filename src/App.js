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
				<h3>Tab Content {tabNumber}</h3>
			</Tab>
		);
	}

	addTab = () => {
		this.setState({ tabs: [ ...this.state.tabs, this.createTab() ] });
	};

	removeTab = () => {
		const tabs = this.state.tabs;
		const newTabs = tabs.slice(1);
		console.log({oldTabs: tabs, newTabs});

		this.setState({ tabs: newTabs });
	};

	onRemoveTab = ({detail: tab}) => {
		this.setState({tabs: this.state.tabs.filter(t => t !== tab)});
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
