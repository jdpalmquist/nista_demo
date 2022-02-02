//
//
//
// Add Patient Body Connect File
//
//
//
import { connect } from 'react-redux'
import AddPatientBodyComponent from '../components/addPatientBody.jsx';
//
//
//
import {
	Navigate,
	CreateRecord,
} from '../actions';
//
//
//
function mapStateToProps(store) {
	return {
		currentPage: store.admin.currentPage,
		isMenuExpanded: store.admin.isMenuExpanded,


	};
}
//
//
//
function mapDispatchToProps(dispatch){
	return {
		navigate(page){
			dispatch(Navigate(page));
		},
		createRecord(record){
			dispatch(CreateRecord(record));
			dispatch(Navigate('physician'));
		},

	};
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( AddPatientBodyComponent );