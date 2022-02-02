//
//
//
// Physician Body Connect File
//
//
//
import { connect } from 'react-redux'
import PhysicianBodyComponent from '../components/physicianBody.jsx';
//
//
//
import {
	Navigate,
	Search,
	FindAllRecords,
	SetViewPatientData,
	AddRecordToSelectList,
	RemoveRecordFromSelectList,

} from '../actions';
//
//
//
function mapStateToProps(store) {
	return {
		currentPage: store.admin.currentPage,
		isMenuExpanded: store.admin.isMenuExpanded,

		patientList: store.physician.patientList,
		patientListCallComplete: store.physician.patientListCallComplete,
		selectList: store.physician.selectList,
	};
}
//
//
//
function mapDispatchToProps(dispatch){
	return {
		search(query){
			dispatch(Search(query));
		},
		findAllRecords(){
			dispatch(FindAllRecords());
		},
		viewPatient(id){
			dispatch(SetViewPatientData(id));
			dispatch(Navigate('physician/view/patient'));
		},
		addRecordToSelectList(patientID){
			dispatch(AddRecordToSelectList(patientID));
		},
		removeRecordFromSelectList(patientID){
			dispatch(RemoveRecordFromSelectList(patientID));
		},
	};
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( PhysicianBodyComponent );