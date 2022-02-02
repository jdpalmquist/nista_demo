//
//
//
// Menu Component
//
//
//
import React from 'react';
//
//
//
import {
	Container,
	Row,
	Col,
	Button,

} from 'reactstrap';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faUserMd,
	faUsers,
	faFolder,
	faCog,
	faExclamationCircle,
	faCaretSquareLeft,
	faCaretSquareRight,
	faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
import Avatar from './avatar';
//
//
//
import {} from '../actions';
//
//
//
export default class MenuComponent extends React.Component {
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
		this.renderAcctTypeMenu = this.renderAcctTypeMenu.bind(this);	
	}
	//
	//
	//
	renderAcctTypeMenu(){
		//
		//
		//
		let submenu = null;
		//
		//
		//
		switch(this.props.acctType){
			//
			//
			//
			case "admin":
				//
				//
				//
				if(this.props.isMenuExpanded === true){
					//
					//
					//
					submenu = (
						<div className="menu-item pointer menu-item-active" onClick={()=>{this.props.navigate('admin')}}>
							<div className="menu-icon menu-icon-active">
								<FontAwesomeIcon icon={faUsers} />
							</div>
							<div className="menu-icon-name">
								Users
							</div>
						</div>
					);
				}
				else{
					//
					//
					//
					submenu = (
						<div className="menu-item pointer menu-item-active" onClick={()=>{this.props.navigate('admin')}}>
							<div className="menu-icon menu-icon-active">
								<FontAwesomeIcon icon={faUsers} />
							</div>
						</div>
					);
				}
			break;
			//
			//
			//
			case "physician":
				//
				//
				//
				if(this.props.isMenuExpanded === true){
					//
					//
					//
					submenu = (
						<div className="menu-item pointer menu-item-active" onClick={()=>{this.props.navigate('physician')}}>
							<div className="menu-icon menu-icon-active">
								<FontAwesomeIcon icon={faFolder} />
							</div>
							<div className="menu-icon-name">
								Patient Files
							</div>
						</div>
					);
				}
				else{
					//
					//
					//
					submenu = (
						<div className="menu-item pointer menu-item-active" onClick={()=>{this.props.navigate('physician')}}>
							<div className="menu-icon menu-icon-active">
								<FontAwesomeIcon icon={faFolder} />
							</div>
						</div>
					);
				}
			break;
			//
			//
			//
			default: 
				//
				//
				//
				console.error('WARNING: renderAcctTypeMenu() --> Unrecognized user account type!');
			break;
		}
		//
		//
		//
		return submenu;
	}
	//
	//
	//
	renderContractedMenu(){
		//
		//
		//
		let submenu = this.renderAcctTypeMenu();
		//
		//
		//
		return (
			<div className="menu-component">
				<div id="menu-insert">
					<Row>
						<Col>
							<div className="menu-logo-sm text-center">
								<img src="./img/logo-vertical.png" height="100%" />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<Avatar 
								isMenuExpanded={this.props.isMenuExpanded} 
								username={this.props.userName}
								accttype={this.props.acctType} />
						</Col>
					</Row>
					<Row>
						<Col>
							{submenu}
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="menu-item pointer" onClick={()=>{alert('Under Construction')}}>
								<div className="menu-icon">
									<FontAwesomeIcon icon={faCog} />
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="menu-item pointer" onClick={()=>{alert('Under Construction')}}>
								<div className="menu-icon">
									<FontAwesomeIcon icon={faExclamationCircle} />
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="menu-item pointer" onClick={()=>{this.props.logout()}}>
								<div className="menu-icon">
									<FontAwesomeIcon icon={faSignOutAlt} />
								</div>
							</div>
						</Col>
					</Row>

					<div className="menu-hide">
						<hr/>
						<div className="pointer" onClick={this.props.showMenu}>
							<div id="hide-menu-icon">
								<FontAwesomeIcon icon={faCaretSquareRight} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	//
	//
	//
	renderExpandedMenu(){
		//
		//
		//
		let submenu = this.renderAcctTypeMenu();
		//
		//
		//
		return (
			<div className="menu-component">
				<div id="menu-insert">
					<Row>
						<Col>
							<div className="menu-logo-container">
								<img className="menu-logo" src="./img/logo2.png" />
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<Avatar 
								isMenuExpanded={this.props.isMenuExpanded} 
								username={this.props.userName}
								accttype={this.props.acctType} />
						</Col>
					</Row>
					<Row>
						<Col>
							{submenu}
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="menu-item pointer" onClick={()=>{alert('Under Construction')}}>
								<div className="menu-icon">
									<FontAwesomeIcon icon={faCog} />
								</div>
								<div className="menu-icon-name">
									Settings
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="menu-item pointer" onClick={()=>{alert('Under Construction')}}>
								<div className="menu-icon">
									<FontAwesomeIcon icon={faExclamationCircle} />
								</div>
								<div className="menu-icon-name">
									Help
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							<div className="menu-item pointer" onClick={()=>{this.props.logout()}}>
								<div className="menu-icon">
									<FontAwesomeIcon icon={faSignOutAlt} />
								</div>
								<div className="menu-icon-name">
									Logout
								</div>
							</div>
						</Col>
					</Row>

					<div className="menu-hide">
						<hr/>
						<div className="pointer" onClick={this.props.hideMenu}>
							<div id="hide-menu-icon">
								<FontAwesomeIcon icon={faCaretSquareLeft} />
							</div>
							<div id="hide-menu-icon-name">
								Hide
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	//
	//
	//
	render(){
		//
		//
		//
		if(this.props.isMenuExpanded === true){
			//
			//
			//
			return this.renderExpandedMenu();
		}
		else{
			//
			//
			//
			return this.renderContractedMenu();
		}
	}
}