//
//
//
// Add Patient Top Component
//
//
//
import React from 'react';
import classnames from 'classnames';
//
//
//
import {
	Button,

} from 'reactstrap';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faSearch,
	faPlus,
	faEdit,
	faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
export default class AddPatientTopComponent extends React.Component {
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

	}
	//
	//
	//
	render(){
		//
		//
		//
		let top = {
			'top': this.props.isMenuExpanded === true ? true : false,
			'top-sm': this.props.isMenuExpanded === false ? true : false,
		};
		//
		//
		//
		return (
			<div className={classnames(top)}>
				<div id="addPatientTopText" className="width30 display-inline pointer" onClick={()=>{this.props.navigate('physician')}}>
					&laquo;&nbsp;Add New Patient
				</div>
				<div id="top-controls" className="width70 display-inline text-right">
					
				</div>
			</div>
		);
	}
}