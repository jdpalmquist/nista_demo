//
//
//
// Percentage Bar Component
//
//
//
import React from 'react';
import classnames from 'classnames';
//
//
//
export default class PercentageBarComponent extends React.Component {
	//
	//
	//
	constructor(props){
		//
		//
		//
		super(props);
		//
		//
		//
		this.state = {};
		//
		//
		//

	}
	//
	//
	//
	render(){
		//
		//
		//
		let perc = this.props.percentage;
		//
		//
		//
		let barStyle = {
			display: 'inline-block',
			marginLeft: '20px',
			marginRight: '20px',
			minWidth: perc + '%',
			width: perc + '%',
			maxWidth: perc + '%',
			padding: '10px',

			backgroundColor: '#0CB2A3',
			borderRadius: '10px',
		};
		//
		//
		//
		let numStyle = {
			paddingLeft: '10px',
			display: 'inline-block',
			fontSize: '20px',
			fontWeight: 'bolder',
			color: '#232323',
			position: 'relative',
			top: '-3px',

		}
		//
		//
		//
		return (
			<div className="width100">
				<div style={barStyle}>

				</div>
				<div style={numStyle}>
					{perc}&nbsp;%
				</div>
			</div>
		);
	}
}