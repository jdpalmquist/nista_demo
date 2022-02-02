//
//
//
// Admin Body Component
//
//
//
import React from 'react';
import classnames from 'classnames';
//
//
//
import { 
	TabContent, 
	TabPane, 
	Nav, 
	NavItem, 
	NavLink, 
	Card, 
	Button, 
	CardTitle, 
	CardText, 
	Row, 
	Col, 
	Table, 
} from 'reactstrap';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faCog,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
export default class AdminBodyComponent extends React.Component {
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
			activeTab: '1',
		};
		//
		//
		//
		this.toggleTab = this.toggleTab.bind(this);
		//
		//
		//
		this.prerenderTab = this.prerenderTab.bind(this);
	}
	//
	//
	//
	componentDidMount(){
		//
		//
		//
		this.props.getAdminsList();
		this.props.getPhysiciansList();
		this.props.getTechniciansList();
	}
	//
	//
	//
	toggleTab(tab){
		//
		//
		//
		if(this.state.activeTab != tab){
			//
			//
			//
			this.setState({activeTab: tab});
		}
	}
	//
	//
	//
	prerenderTab(list){
		//
		//
		//
		let rows = [];
		let a = null;
		//
		//
		//
		if(list != null && list.length > 0){
			//
			//
			//
			for(let i = 0; i < list.length; i++){
				//
				//
				//
				a = list[i];
				//
				//
				//
				rows.push(
					<tr key={i}>
						<td className="text-center">
							<input type="checkbox" />
						</td>
						<td>
							{a.username}
						</td>
						<td>
							{a.acctType}
						</td>
					</tr>
				);
			}
			//
			//
			//
			return (
				<Table className="width100">
					<thead>
						<tr>
							<th style={{borderTop: 'none'}} className="text-center width10">
								<input type="checkbox" />&nbsp;All
							</th>
							<th style={{borderTop: 'none'}} className="width30">
								User
							</th>
							<th style={{borderTop: 'none'}}>
								Type
							</th>
						</tr>
					</thead>
					<tbody className="scroll-y">
						{rows}
					</tbody>
				</Table>
			);
		}
		else{
			//
			//
			//
			return (
				<div className="text-center">
					<br/>
					<br/>
					<i>
						No results
					</i>
				</div>
			);
		}
	}
	//
	//
	//
	render(){
		//
		//
		//
		let tab1_style = { 
			active: this.state.activeTab === '1', 
			'NISTA-color': this.state.activeTab !== '1',
			pointer: true, 
		};
		let tab2_style = {
			active: this.state.activeTab === '2', 
			'NISTA-color': this.state.activeTab !== '2',
			pointer: true, 
		};
		let tab3_style = {
			active: this.state.activeTab === '3', 
			'NISTA-color': this.state.activeTab !== '3',
			pointer: true, 
		};
		let tab4_style = {
			active: this.state.activeTab === '4', 
			'NISTA-color': this.state.activeTab !== '4',
			pointer: true, 
		};
		//
		//
		//
		let physiciansTab = this.prerenderTab(this.props.physiciansList);
		let clinicMgrTab = this.prerenderTab();
		let dataScientistTab = this.prerenderTab();
		let adminsTab = this.prerenderTab(this.props.adminsList);
		//
		//
		//
		return (
			<div>
				<Nav tabs>
			        <NavItem>
				          <NavLink
				            className={classnames(tab1_style)}
				            onClick={() => { this.toggleTab('1'); }}
				          >
			            	Physicians
			          	</NavLink>
			        </NavItem>
			        <NavItem>
			          	<NavLink
			            	className={classnames(tab2_style)}
			            	onClick={() => { this.toggleTab('2'); }}
			          	>
			            	Clinic Managers
			          	</NavLink>
			        </NavItem>
			        <NavItem>
			          	<NavLink
			            	className={classnames(tab3_style)}
			            	onClick={() => { this.toggleTab('3'); }}
			          	>
			            	Data Scientists
			          	</NavLink>
			        </NavItem>
			        <NavItem>
			          	<NavLink
			            	className={classnames(tab4_style)}
			            	onClick={() => { this.toggleTab('4'); }}
			          	>
			            	System Admins
			          	</NavLink>
			        </NavItem>
			    </Nav>
			    <TabContent activeTab={this.state.activeTab}>
			       	<TabPane tabId="1">
			       		<Row>
				            <Col sm="12">
				            	<br/>
				            	{physiciansTab}
					        </Col>
			        	</Row>
			        </TabPane>
			        <TabPane tabId="2">
			       		<Row>
				            <Col sm="12">
					            <br/>
					            <br/>
					            <div className="text-center">
					            	Clinic Mgrs. Tabs Under Construction
					            </div>
					        </Col>
			        	</Row>
			        </TabPane>
			        <TabPane tabId="3">
			       		<Row>
				            <Col sm="12">
					            <br/>
					            <br/>
					            <div className="text-center">
					            	Data Scientist Tabs Under Construction
					            </div>
					        </Col>
			        	</Row>
			        </TabPane>
			        <TabPane tabId="4">
			       		<Row>
				            <Col sm="12">
				            	<br/>
				            	{adminsTab}
					        </Col>
			        	</Row>
			        </TabPane>
			    </TabContent>
			</div>
		);
	}
}