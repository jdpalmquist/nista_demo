//
//
//
// Admin Connect File
//
//
//
import { connect } from 'react-redux'
import PageComponent from '../components/page.jsx';
//
//
//
import {
	HideMenu,
	ShowMenu,
	Navigate,
	Logout,
	DeleteRecord,
} from '../actions';
//
//
//
function mapStateToProps(store) {
	return {
		userName: store.auth.userName,
		acctType: store.auth.acctType,
		isAuthorized : store.auth.isAuthorized,

		isMenuExpanded: store.global.isMenuExpanded,

		currentPage: store.auth.page,

		patientList: store.physician.patientList,
		patientID: store.physician.patientID,
		selectList: store.physician.selectList,
		
	}
}
//
//
//
function mapDispatchToProps(dispatch){
	return {
		navigate(page){
			dispatch(Navigate(page));
		},
		hideMenu(){
			dispatch(HideMenu());
		},
		showMenu(){
			dispatch(ShowMenu());
		},
		logout(){
			dispatch(Logout());
		},
		deleteRecord(patientID){
			dispatch(DeleteRecord(patientID));
		},
		
	}
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( PageComponent );