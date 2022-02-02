//
//
//
// View Patient Body Component
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
	faTint,
	faLungs,
	faHeartbeat,
	faWeight,
	faBalanceScale,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
import Patient from '../containers/patient.js';
//
//
//
export default class ViewPatientBodyComponent extends React.Component {
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
	}
	//
	//
	//
	render(){
		
		//
		//
		//
		return (
			<div id="view-patient">
				<div id="view-patient-page-container">
					<div id="view-patient-page-insert">
						<div id="view-patient-page">
							<Patient />
						</div>
					</div>
				</div>
				<div id="view-patient-menu-container">
					<div id="view-patient-menu">
						<div id="view-patient-menu-insert">
							<div id="view-patient-menu-title">
								About
							</div>
							<div className="view-patient-menu-section">
								GENERAL
							</div>
							<div>
								<div className="view-patient-menu-label">
									Gender
								</div>
								<div className="view-patient-menu-item">
									{this.props.gender}
								</div>
							</div>
							<div>
								<div className="view-patient-menu-label">
									Age
								</div>
								<div className="view-patient-menu-item">
									{this.props.age}
								</div>
							</div>
							<div>
								<div className="view-patient-menu-label">
									Ethnicity
								</div>
								<div className="view-patient-menu-item">
									{this.props.ethnicity}
								</div>
							</div>
							<div>
								<div className="view-patient-menu-label">
									Sample Date
								</div>
								<div className="view-patient-menu-item">
									{this.props.sampleDate}
								</div>
							</div>
							<br/>
							<hr/>
							<br/>
							<div className="view-patient-menu-section">
								VITAL SIGNS
							</div>
							<div>
								<div className="view-patient-menu-icon">
									<FontAwesomeIcon icon={faTint} />
								</div>
								<div className="view-patient-menu-data">
									<div className="view-patient-menu-data-label">
										Blood Type
									</div>
									<div className="view-patient-menu-data-value">
										{this.props.bloodType}
									</div>
								</div>
							</div>
							<div>
								<div className="view-patient-menu-icon">
									<FontAwesomeIcon icon={faLungs} />
								</div>
								<div className="view-patient-menu-data">
									<div className="view-patient-menu-data-label">
										Blood Oxygen
									</div>
									<div className="view-patient-menu-data-value">
										{this.props.bloodOxygen} %
									</div>
								</div>
							</div>
							<div>
								<div className="view-patient-menu-icon">
									<FontAwesomeIcon icon={faHeartbeat} />
								</div>
								<div className="view-patient-menu-data">
									<div className="view-patient-menu-data-label">
										Blood Pressure
									</div>
									<div className="view-patient-menu-data-value">
										{this.props.bloodPressure} (mm/Hg)
									</div>
								</div>
							</div>
							<div>
								<div className="view-patient-menu-icon">
									<FontAwesomeIcon icon={faBalanceScale} />
								</div>
								<div className="view-patient-menu-data">
									<div className="view-patient-menu-data-label">
										Weight
									</div>
									<div className="view-patient-menu-data-value">
										{this.props.weight} (Kg)
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}