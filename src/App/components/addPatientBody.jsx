//
//
//
// Add Patient Body Component
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
	Spinner,
	Input,
} from 'reactstrap';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faCog,
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
export default class AddPatientBodyComponent extends React.Component {
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
			gender: '',
			age: '',
			ethnicity: '',
			sampleDate: '',
			bloodType: '',
			bloodOxygen: '',
			bloodPressure: '',
			weight: '',
		};
		//
		//
		//
		this.save = this.save.bind(this);
		this.cancel = this.cancel.bind(this);
		this.createRecord = this.createRecord.bind(this);
		//
		//
		//
		this.genderChange = this.genderChange.bind(this);
		this.ageChange = this.ageChange.bind(this);
		this.ethnicityChange = this.ethnicityChange.bind(this);
		this.sampleDateChange = this.sampleDateChange.bind(this);
		this.bloodTypeChange = this.bloodTypeChange.bind(this);
		this.bloodOxygenChange = this.bloodOxygenChange.bind(this);
		this.bloodPressureChange = this.bloodPressureChange.bind(this);
		this.weightChange = this.weightChange.bind(this);
	}
	//
	//
	//
	genderChange(event){
		this.setState({
			gender: event.target.value,
		});
	}
	//
	//
	//
	ageChange(event){
		this.setState({
			age: event.target.value,
		});
	}
	//
	//
	//
	ethnicityChange(event){
		this.setState({
			ethnicity: event.target.value,
		});
	}
	//
	//
	//
	sampleDateChange(event){
		this.setState({
			sampleDate: event.target.value,
		});
	}
	//
	//
	//
	bloodTypeChange(event){
		this.setState({
			bloodType: event.target.value,
		});
	}
	//
	//
	//
	bloodOxygenChange(event){
		this.setState({
			bloodOxygen: event.target.value,
		});
	}
	//
	//
	//
	bloodPressureChange(event){
		this.setState({
			bloodPressure: event.target.value,
		});
	}
	//
	//
	//
	weightChange(event){
		this.setState({
			weight: event.target.value
		});
	}
	//
	//
	//
	save(){
		//
		//
		//
		let chks = {
			gender: false,
			age: false,
			ethnicity: false,
			sampleDate: false,
			bloodType: false,
			bloodOxygen: false,
			bloodPressure: false,
			weight: false,
		};
		//
		//
		//
		if(this.state.gender !== '')
			chks.gender = true;
		//
		//
		//
		if(this.state.age !== '')
			chks.age = true;
		//
		//
		//
		if(this.state.ethnicity !== '')
			chks.ethnicity = true;
		//
		//
		//
		if(this.state.sampleDate !== '')
			chks.sampleDate = true;
		//
		//
		//
		if(this.state.bloodType !== '')
			chks.bloodType = true;
		//
		//
		//
		if(this.state.bloodOxygen !== '')
			chks.bloodOxygen = true;
		//
		//
		//
		if(this.state.bloodPressure !== '')
			chks.bloodPressure = true;
		//
		//
		//
		if(this.state.weight !== '')
			chks.weight = true;
		//
		//
		//
		let keys = Object.keys(chks);
		let key = null;
		let allChksPassed = true;
		for(let i = 0; i < keys.length; i++){
			//
			//
			//
			key = keys[i];
			//
			//
			//
			if(chks[key] !== true)
				allChksPassed = false;
		}
		//
		//
		//
		if(allChksPassed === true){
			//
			//
			//
			this.createRecord();
		}
		else{
			//
			//
			//
			let msg = 'The following fields were blank:\n';
			//
			//
			//
			if(chks.gender == false)
				msg += '- Gender\n';
			//
			//
			//
			if(chks.age == false)
				msg += '- Age\n';
			//
			//
			//
			if(chks.ethnicity == false)
				msg += '- Ethnicity\n';
			//
			//
			//
			if(chks.sampleDate == false)
				msg += '- Sample Date\n';
			//
			//
			//
			if(chks.bloodType == false)
				msg += '- Blood Type\n';
			//
			//
			//
			if(chks.bloodOxygen == false)
				msg += '- Blood Oxygen %\n';
			//
			//
			//
			if(chks.bloodPressure == false)
				msg += '- Blood Pressure\n';
			//
			//
			//
			if(chks.weight == false)
				msg += '- Weight\n';
			//
			//
			//
			msg += '\nProceed with incomplete data?';
			//
			//
			//
			if(confirm(msg)){
				//
				//
				//
				this.createRecord();
			}
		}
	}
	//
	//
	//
	createRecord(){
		//
		//
		//
		let record = {
			gender: this.state.gender,
			age: this.state.age,
			ethnicity: this.state.ethnicity,
			sampleDate: this.state.sampleDate,
			bloodType: this.state.bloodType,
			bloodOxygen: this.state.bloodOxygen,
			bloodPressure: this.state.bloodPressure,
			weight: this.state.weight,
			status: 'pending',
		};
		//
		//
		//
		this.props.createRecord(record);
	}
	//
	//
	//
	cancel(){
		//
		//
		//
		this.props.navigate('physician');
	}
	//
	//
	//
	render(){
		//
		//
		//
		return (
			<div className="add-patient-container scroll-y-auto">
				<div className="add-patient-demographics">
					<table className="add-patient-demographics-table">
						<tbody>
							<tr>
								<td>
									<div className="add-patient-patientID">
										<Input type="text" placeholder="Patient ID" disabled />
									</div>
								</td>
								<td>
									&nbsp;
									<FontAwesomeIcon icon={faExclamationCircle} />
									<span>
										&nbsp;The patient ID is created automatically
									</span>
								</td>
							</tr>
							<tr>
								<td>
									<div className="add-patient-label">
										Gender
									</div>
									<Input 
										type="select" 
										className="add-patient-input" 
										value={this.state.gender} 
										onChange={this.genderChange}>
										<option value=""></option>
										<option>Female</option>
										<option>Male</option>
									</Input>
								</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<div className="add-patient-label">
										Age
									</div>
									<Input 
										type="text" 
										className="add-patient-input" 
										value={this.state.age}
										onChange={this.ageChange}/>
								</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<div className="add-patient-label">
										Ethnicity
									</div>
									<Input 
										type="select" 
										className="add-patient-input"
										value={this.state.ethnicity}
										onChange={this.ethnicityChange}>
										<option></option>
										<option>Asian</option>
										<option>Latino</option>
										<option>African</option>
										<option>Indian</option>
										<option>Caucausian</option>
										<option>Middle Eastern</option>
										<option>Pacific Islander</option>
										<option>Mixed</option>
										<option>Unknown</option>
									</Input>
								</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<div className="add-patient-label">
										Date of Request
									</div>
									<Input 
										type="text" 
										className="add-patient-input" 
										value={this.state.sampleDate}
										onChange={this.sampleDateChange}/>
								</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="add-patient-meddata">
					<table className="add-patient-meddata-table">
						<tbody>
							<tr>
								<td>
									<div className="add-patient-label">
										Blood Type
									</div>
									<Input 
										type="select" 
										className="add-patient-input"
										value={this.state.bloodType}
										onChange={this.bloodTypeChange}>
										<option></option>
										<option>A+</option>
										<option>A-</option>
										<option>B+</option>
										<option>B-</option>
										<option>O+</option>
										<option>O-</option>
										<option>AB+</option>
										<option>AB-</option>
									</Input>
								</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<div className="add-patient-label">
										Blood Pressure (mmHg)
									</div>
									<Input 
										type="text"  
										className="add-patient-input"
										value={this.state.bloodPressure}
										onChange={this.bloodPressureChange} />
								</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<div className="add-patient-label">
										Blood Oxygen %
									</div>
									<Input 
										type="text" 
										className="add-patient-input"
										value={this.state.bloodOxygen}
										onChange={this.bloodOxygenChange} />
								</td>
								<td></td>
							</tr>
							<tr>
								<td>
									<div className="add-patient-label">
										Weight (Kg)
									</div>
									<Input 
										type="text" 
										className="add-patient-input"
										value={this.state.weight}
										onChange={this.weightChange} />
								</td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="add-patient-controls">
					<Button 
						color="secondary" 
						className="NISTA-button add-patient-button"
						onClick={this.save}>
						Save
					</Button>
					&nbsp;
					&nbsp;
					<Button 
						outline 
						color="secondary"
						className="add-patient-button" 
						onClick={this.cancel}>
						Cancel
					</Button>
				</div>
			</div>
		);
	}
}