//
//
//
// Patient Component
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
	Container,
	Table, 
	Spinner,
	Tooltip,
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
import AnalysisResults from './analysisResults';
import ImageGallery from './imageGallery';
//
//
//
export default class PatientComponent extends React.Component{
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
		this.renderSpinner = this.renderSpinner.bind(this);
		this.renderImageGallery = this.renderImageGallery.bind(this);
	}
	//
	//
	//
	componentDidMount(){
		//
		//
		//
		this.props.getPatientImages(this.props.patientID);
	}
	//
	//
	//
	changeBreast(breast){
		//
		//
		//
		this.props.changeBreast(breast);
	}
	//
	//
	//
	renderSpinner(){
		//
		//
		//
		return (
			<div className="text-center">
				<br/>
				<br/>
				<Spinner />
				<br/>
				<br/>
				<i>Working...</i>
			</div>
		);
	}
	//
	//
	//
	renderImageGallery(){
		//
		//
		//
		let leftBreast = {
			'patient-active-tab': this.props.breast == 'left' ? true : false,
			'pointer': this.props.breast == 'left' ? false : true,
		};
		let rightBreast = {
			'patient-active-tab': this.props.breast == 'right' ? true : false,
			'pointer': this.props.breast == 'right' ? false : true,
		};
		//
		//
		//
		return (
			<Row>
				<Col md="5">
					<div id="patient-left-col-title">
						Diagnostics
					</div>
					<div>
						<div 
							id="left-breast" 
							className={classnames(leftBreast)}
							onClick={()=>{this.changeBreast('left')}}>
							Left Breast
						</div>
						<div 
							id="right-breast" 
							className={classnames(rightBreast)}
							onClick={()=>{this.changeBreast('right')}}>
							Right Breast
						</div>
					</div>
					<div id="diagnostic-results-title">
						RESULT OF INSPECTION
					</div>
					<div>
						<AnalysisResults 
							patientStatus={this.props.patientStatus}
							analysisResults={this.props.analysisResults}
						/>
					</div>
				</Col>
				<Col md="7" id="patient-right-col">
					<ImageGallery 
						patientID={this.props.patientID}
						breast={this.props.breast}
						images={this.props.images}
						numImages={this.props.numImages}
						getImagesCallComplete={this.props.getImagesCallComplete}
						uploadImage={this.props.uploadImage}
					/>
				</Col>
			</Row>
		);
	}
	//
	//
	//
	//
	//
	//
	render(){
		//
		//
		//
		if(this.props.getImagesCallComplete === false){
			//
			//
			//
			return this.renderSpinner();
		}
		else{
			//
			//
			//
			return this.renderImageGallery();
		}
	}
}