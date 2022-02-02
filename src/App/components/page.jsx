//
//
//
// Main App View "Page"
//
//
//
import React from 'react';
import moment from 'moment';
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
	faUserMd,
	faUsers,
	faCog,
	faExclamationCircle,
	faCaretSquareLeft,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
import Menu from './menu';
//
//
//
import AdminTop from './adminTop';
import AdminBody from '../containers/adminBody';
//
//
//
import PhysicianTop from './physicianTop';
import PhysicianBody from '../containers/physicianBody';
//
//
//
import AddPatientTop from './addPatientTop';
import AddPatientBody from '../containers/addPatientBody';
//
//
//
import ViewPatientTop from './viewPatientTop';
import ViewPatientBody from '../containers/viewPatientBody';
//
//
//
export default class PageComponent extends React.Component {
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
		this.state = {}
		//
		//
		//
		this.renderAdminTop = this.renderAdminTop.bind(this);
		this.renderAdminBody = this.renderAdminBody.bind(this);
		//
		//
		//
		this.renderPhysicianTop = this.renderPhysicianTop.bind(this);
		this.renderPhysicianBody = this.renderPhysicianBody.bind(this);
		//
		//
		//

	}
	//
	//
	//
	renderAdminTop(){
		//
		//
		//
		let top = null;
		//
		//
		//
		switch(this.props.currentPage){
			//
			//
			//
			case 'admin':
				top = (
					<AdminTop 
						currentPage={this.props.currentPage}
						isMenuExpanded={this.props.isMenuExpanded} />
				);
			break;
			//
			//
			//
			default:
				console.error('WARNING: page.jsx --> renderAdminTop() --> Invalid page!');
			break;
		}
		//
		//
		//
		return top;		
	}
	//
	//
	//
	renderAdminBody(){
		//
		//
		//
		let body = null;
		//
		//
		//
		switch(this.props.currentPage){
			//
			//
			//
			case 'admin':
				body = (
					<AdminBody />
				);
			break;
			//
			//
			//
			default:
				console.error('WARNING: page.jsx --> prerenderBody() --> Invalid user account type!');
			break;
		}
		//
		//
		//
		return body;
	}
	//
	//
	//
	renderPhysicianTop(){
		//
		//
		//
		let top = null;
		//
		//
		//
		switch(this.props.currentPage){
			//
			//
			//
			case 'physician':
				top = (
					<PhysicianTop 
						currentPage={this.props.currentPage}
						patientList={this.props.patientList}
						navigate={this.props.navigate}
						selectList={this.props.selectList}
						deleteRecord={this.props.deleteRecord}
						isMenuExpanded={this.props.isMenuExpanded} />
				);
			break;
			//
			//
			//
			case 'physician/add/patient':
				top = (
					<AddPatientTop 
						currentPage={this.props.currentPage}
						navigate={this.props.navigate}
						isMenuExpanded={this.props.isMenuExpanded} />
				);
			break;
			//
			//
			//
			case 'physician/view/patient':
				top = (
					<ViewPatientTop 
						currentPage={this.props.currentPage}
						patientID={this.props.patientID}
						navigate={this.props.navigate}
						isMenuExpanded={this.props.isMenuExpanded} />
				);
			break;
			//
			//
			//
			default:

			break;
		}
		//
		//
		//
		return top;
	}
	//
	//
	//
	renderPhysicianBody(){
		//
		//
		//
		let body = null;
		//
		//
		//
		switch(this.props.currentPage){
			//
			//
			//
			case 'physician':
				body = (
					<PhysicianBody />
				);
			break;
			//
			//
			//
			case 'physician/add/patient':
				body = (
					<AddPatientBody />
				);
			break;
			//
			//
			//
			case 'physician/view/patient':
				body = (
					<ViewPatientBody />
				);			
			break;
			//
			//
			//
			default:
				console.error('WARNING: page.jsx --> prerenderBody() --> Invalid user account type!');
			break;
		}
		//
		//
		//
		return body;
	}
	//
	//
	//
	render(){
		// 
		//
		//
		let menu_column = {
			'menu-column': this.props.isMenuExpanded === true ? true : false,
			'menu-col-sm': this.props.isMenuExpanded === false ? true : false,
		};
		//
		//
		//
		let view_column = {
			'view-column': this.props.isMenuExpanded === true ? true : false,
			'view-col-sm': this.props.isMenuExpanded === false ? true : false,
		};
		//
		//
		//
		let view_top_container = {
			'view-top-container': this.props.isMenuExpanded === true ? true : false,
			'view-top-small': this.props.isMenuExpanded === false ? true : false,
		};
		//
		//
		//
		let view_body_container = {
			'view-body-container': this.props.isMenuExpanded === true ? true : false,
			'view-body-small': this.props.isMenuExpanded === false ? true : false,
		};
		//
		//
		//
		let top = null;
		let body = null;
		//
		//
		//
		switch(this.props.acctType){
			//
			//
			//
			case 'admin':
				top = this.renderAdminTop();
				body = this.renderAdminBody();
			break;
			//
			//
			//
			case 'physician':
				top = this.renderPhysicianTop();
				body = this.renderPhysicianBody();
			break;
			//
			//
			//
			default: 
				console.error('WARNING: page.jsx --> render() --> Invalid user account type!');
			break;
		}
		//
		//
		//
		return (
			<div id="page-view">
				<div className={classnames(menu_column)}>
					<Menu 
						isMenuExpanded={this.props.isMenuExpanded} 
						userName={this.props.userName} 
						acctType={this.props.acctType} 
						navigate={this.props.navigate}
						hideMenu={this.props.hideMenu}
						showMenu={this.props.showMenu} 
						logout={this.props.logout} />
				</div>
				<div className={classnames(view_column)}>
					<div className={classnames(view_top_container)}>
						{top}
					</div>
					<div className={classnames(view_body_container)}>
						<div id="body-insert">
							<div id="body">
								{body}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}