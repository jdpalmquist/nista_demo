//
//
//
// Admin View Top Component
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
export default class AdminTopComponent extends React.Component {
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
				<div className="width30 display-inline">
					Users
				</div>
				<div id="top-controls" className="width70 display-inline text-right">
					<span style={{color: '#999999'}}>
						<FontAwesomeIcon icon={faSearch} />
						&nbsp;
					</span>
					<input 
						className="top-controls-search" 
						placeholder="Search" 
						style={{width:'150px', marginRight:'20px'}} 
						/>
					<div className="top-button NISTA-color pointer" onClick={()=>{alert('Under Construction')}}>
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