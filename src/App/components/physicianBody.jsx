//
//
//
// Physician Body Component
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
	Row, 
	Col, 
	Table, 
	Spinner,
} from 'reactstrap';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faCog,
	faStopwatch,
	faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
import Checkbox from './checkbox';
//
//
//
export default class PhysicianBodyComponent extends React.Component {
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
			
		};
		//
		//
		//
		this.prerenderPatientList = this.prerenderPatientList.bind(this);
		this.viewPatient = this.viewPatient.bind(this);
	}
	//
	//
	//
	componentDidMount(){
		//
		//
		// search with empty query to get all patients
		this.props.findAllRecords();
	}
	//
	//
	//
	viewPatient(event){
		//
		//
		//
		let e = event.target;
		let patientID = e.getAttribute('patientid');
		//
		//
		//
		this.props.viewPatient(patientID);		
	}
	//
	//
	//
	prerenderPatientList(){
		//
		//
		//
		let table = null;
		//
		//
		//
		if(this.props.patientListCallComplete == true){
			//
			//
			//
			if(this.props.patientList.length > 0){
				//
				//
				//
				let list = [];
				let p = null;
				//
				//
				//
				for(let i = 0; i < this.props.patientList.length; i++){
					//
					//
					//
					/*
					{
						"_id":{
							"$oid":"5f60eed38fcb734e0a473520"
						},
						"createdBy":{
							"$oid":"5f4afb224b2bcc4cdb4d6827"
						},
						"usertype":"admin",
						"createdOn":{
							"$numberInt":"1600188115"
						},
						"gender":"Female",
						"age":"49",
						"ethnicity":"Caucasian",
						"sampleDate":"8-23-2020",
						"bloodType": 'A-',
						"bloodOxygen": '93',
						"bloodPressure": 120-105,
						"weight": '72.3',
						
						"technician":[],
						"physician":[],
						"admin":[],
						"docs":[
							{
								"name":"mammogram1.png",
								"path":"./uploads/F.mXviLQqwQUZVpFD3HRxuiz0yFrIG3jfrFW27NYc3Z7I5cOWutdK/mammogram1.png",
								"encoding":"7bit",
								"mimetype":"image/png",
								"size":{
									"$numberInt":"475387"
								}
							},
							{
								"name":"mammogram2.png",
								"path":"./uploads/F.mXviLQqwQUZVpFD3HRxuiz0yFrIG3jfrFW27NYc3Z7I5cOWutdK/mammogram2.png",
								"encoding":"7bit",
								"mimetype":"image/png",
								"size":{"$numberInt":"475387"}
							}
						]
					}
					*/
					//
					//
					//
					p = Object.assign({}, this.props.patientList[i]);
					//
					//
					//
					let checkbox = null;
					if(this.props.selectList.includes(p._id)){
						//
						//
						//
						checkbox = (
							<Checkbox
								checked="true"
								patientID={p._id} 
								onCheck={this.props.addRecordToSelectList}
								onUncheck={this.props.removeRecordFromSelectList}
							/>
						);
					}
					else{
						//
						//
						//
						checkbox = (
							<Checkbox
								checked="false"
								patientID={p._id} 
								onCheck={this.props.addRecordToSelectList}
								onUncheck={this.props.removeRecordFromSelectList}
							/>
						);
					}
					//
					//
					//
					let status = null;
					if(p.status == 'pending'){
						//
						//
						//
						status = (
							<span>
								<span style={{color: '#F4D063'}}>
										<FontAwesomeIcon icon={faStopwatch} />
								</span>
								&nbsp;
								&nbsp;
								In Progress...
							</span>
						);
					}
					else{
						//
						//
						//
						status = (
							<span>
								<span style={{color: '#0CB2A3'}}>
										<FontAwesomeIcon icon={faCheckCircle} />
								</span>
								&nbsp;
								&nbsp;
								Result is ready
							</span>
						);
					}
					//
					//
					//
					list.push(
						<tr className="patient-list-row" key={i}>
							<td>
								{checkbox}
							</td>
							<td 
								className="patient-list-pid"
								patientid={p._id}
								onClick={this.viewPatient}>
								{p._id}
							</td>
							<td 
								className="patient-list-date"
								patientid={p._id}
								onClick={this.viewPatient}>
								{moment.unix(p.createdOn).format('MMMM D, YYYY, h:mm a')}
							</td>
							<td 
								className="patient-list-status"
								patientid={p._id}
								onClick={this.viewPatient}>
								{status}
							</td>
						</tr>
					);
				}
				//
				//
				//
				table = (
					<Table>
						<thead>
							<tr>
								<th className="width10">
									<input type="checkbox" />
									&nbsp;
									All
								</th>
								<th className="width25">
									File Id
								</th>
								<th className="width30">
									Date
								</th>
								<th>
									Status
								</th>
							</tr>
						</thead>
						<tbody>
							{list}
						</tbody>
					</Table>
				);
			}
			else{
				//
				//
				//
				table = (
					<div className="text-center">
						<br/>
						<br/>
						<i>No Patients Found</i>
						<br/>
					</div>
				);
			}
		}
		else{
			//
			//
			//
			table = (
				<div className="text-center">
					<br/>
					<br/>
					<i>Working</i>
					<br/>
					<br/>
					<Spinner color="secondary" />
				</div>
			);
		}
		//
		//
		//
		return table;
	}
	//
	//
	//
	render(){
		//
		//
		//
		let patientList = this.prerenderPatientList();
		//
		//
		//
		return (
			<div>
				{patientList}
			</div>
		);
	}
}