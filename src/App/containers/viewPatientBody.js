//
//
//
// View Patient Body Connect File
//
//
//
import { connect } from 'react-redux';
import ViewPatientBodyComponent from '../components/viewPatientBody.jsx';
//
//
//
import {
	Search,
	
} from '../actions';
//
//
//
function mapStateToProps(store) {
	return {
		currentPage: store.admin.currentPage,
		isMenuExpanded: store.admin.isMenuExpanded,

		gender: store.physician.gender,
		age: store.physician.age,
		ethnicity: store.physician.ethnicity,
		sampleDate: store.physician.sampleDate,
		bloodType: store.physician.bloodType,
		bloodOxygen: store.physician.bloodOxygen,
		bloodPressure: store.physician.bloodPressure,
		weight: store.physician.weight,
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
		
		
	};
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( ViewPatientBodyComponent );