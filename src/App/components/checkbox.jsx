//
//
//
// Checkbox component
//
//
//
import React from 'react';
import classnames from 'classnames';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faCheckSquare,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
export default class Checkbox extends React.Component{
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
		this.state = {
			isChecked: this.props.checked,
		};
		//
		//
		//
		this.handleClick = this.handleClick.bind(this);
	}
	//
	//
	//
	handleClick(){
		//
		//
		//
		if(this.state.isChecked == true || this.state.isChecked == 'true'){
			//
			//
			//
			this.props.onUncheck(this.props.patientID);
			//
			//
			//
			this.setState({
				isChecked: 'false'
			});
		}
		else{
			//
			//
			//
			this.props.onCheck(this.props.patientID);
			//
			//
			//
			this.setState({
				isChecked: 'true'
			});
		}
	}
	//
	//
	//
	render(){
		//
		//
		//
		if(this.state.isChecked == 'true' || this.state.isChecked == true){
			//
			//
			//
			let style = {
				padding:'0px',
				margin:'0px',
				cursor: 'pointer',
				minWidth: '14px',
				minHeight: '14px',
				width: '15px',
				height: '15px',
				maxWidth: '15px',
				maxHeight: '15px',
				fontSize: '15px',
				color: '#0CB2A3',
				position: 'relative',
				top: '-3px',
				borderRadius: '2px',
			};
			//
			//
			//
			return (
				<div
					style={style}
					onClick={()=>{this.handleClick()}}
				>
					<FontAwesomeIcon icon={faCheckSquare} />
				</div>
			);
		}
		else{
			//
			//
			//
			let style = {
				cursor: 'pointer',
				minWidth: '13px',
				minHeight: '13px',
				width: '13px',
				height: '13px',
				maxWidth: '13px',
				maxHeight: '13px',
				borderRadius: '2px',
				border: '1px solid #232323',
				backgroundColor: '#FFFFFF',
			};
			//
			//
			//
			return (
				<div
					style={style}
					onClick={()=>{this.handleClick()}}
				>
				</div>
			);
		}
	}
}