//
//
//
// View Patient Top Component
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
export default class ViewPatientTopComponent extends React.Component {
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
				<div className="width60 display-inline pointer" onClick={()=>{this.props.navigate('physician')}}>
					&laquo;
					&nbsp;
					Patient file 
					&nbsp;
					<b className="NISTA-color">
						{this.props.patientID}
					</b>
				</div>
				<div id="top-controls" className="width40 display-inline text-right">
					<div className="top-button NISTA-color pointer" onClick={()=>{this.props.navigate('physician/add/patient')}}>
						<FontAwesomeIcon icon={faPlus} />
					</div>
					<div className="top-button pointer" style={{color: 'orange'}} onClick={()=>{alert('Under Construction')}}>
						<FontAwesomeIcon icon={faEdit} />
					</div>
					<div className="top-button pointer" style={{color: 'red'}} onClick={()=>{alert('Under Construction')}}>
						<FontAwesomeIcon icon={faTrashAlt} />
					</div>
				</div>
			</div>
		);
	}
}