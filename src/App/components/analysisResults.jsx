//
//
//
// Analysis Results 
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
	ButtonGroup,
} from 'reactstrap';
//
//
//
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
	faFileExport,
	faDownload,
} from '@fortawesome/free-solid-svg-icons';
//
//
//
import PercentageBar from './percentageBar';
//
//
//
export default class AnalysisResults extends React.Component {
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
			numProblemAreas: 0,

		};
		//
		//
		//
		this.renderPendingResults = this.renderPendingResults.bind(this);
		this.renderFinishedResults = this.renderFinishedResults.bind(this);
	}
	//
	//
	//
	renderPendingResults(){
		//
		//
		//
		return (
			<div className="text-center">
				<br/>
				<br/>
				<i>Results Pending</i>
			</div>
		);
	}
	//
	//
	//
	renderFinishedResults(){
		//
		//
		//
		return (
			<div id="patient-results-container">
				<div id="patient-results-insert">
					<div id="patient-results-tissue-condition">
						<div id="patient-results-tissue-condition-title">
							Tissue Condition 
						</div>
						<div id="patient-results-tissue-condition-values">
							Problem Areas
							<div id="patient-results-tissue-condition-number">
								{this.state.numProblemAreas}
							</div>
						</div>
					</div>
					<div id="patient-results-tissue-composition">
						<div id="patient-results-tissue-composition-title">
							Tissue Composition
						</div>
						<div id="patient-results-tissue-composition-left-breast">
							<div className="patient-results-tissue-composition-subtitle">
								Muscles
							</div>
							<div className="patient-results-tissue-composition-percentage">
								<PercentageBar percentage="19" />
							</div>
							<div className="patient-results-tissue-composition-subtitle">
								Adipose
							</div>
							<div className="patient-results-tissue-composition-percentage">
								<PercentageBar percentage="37" />
							</div>
						</div>
						<div id="patient-results-tissue-composition-right-breast">
							<div className="patient-results-tissue-composition-subtitle">
								Muscles
							</div>
							<div className="patient-results-tissue-composition-percentage">
								<PercentageBar percentage="24" />
							</div>
							<div className="patient-results-tissue-composition-subtitle">
								Adipose
							</div>
							<div className="patient-results-tissue-composition-percentage">
								<PercentageBar percentage="45" />
							</div>
						</div>
					</div>
					<div>
						<ButtonGroup className="width100">
							<Button color="secondary" className="NISTA-button">
								<FontAwesomeIcon icon={faFileExport} />
								&nbsp;
								View
							</Button>
							<Button 
								color="secondary"
								onClick={()=>{alert('Under Construction')}}>
								<FontAwesomeIcon icon={faDownload} />
								&nbsp;
								Download
							</Button>
						</ButtonGroup>
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
		console.log('DEBUG: analysisResults.jsx --> render() --> forcing state to finished for debugging!');
		//if(this.props.patientStatus == 'pending'){
		if(this.props.patientStatus !== 'pending'){
			//
			//
			//
			return this.renderPendingResults();			
		}
		else{
			//
			//
			//
			return this.renderFinishedResults();
		}
	}
}