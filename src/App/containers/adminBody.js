//
//
//
// Admin Connect File
//
//
//
import { connect } from 'react-redux'
import AdminBodyComponent from '../components/adminBody.jsx';
//
//
//
import {
	GetTechniciansList,
	GetPhysiciansList,
	GetAdminsList,
} from '../actions';
//
//
//
function mapStateToProps(store) {
	return {
		currentPage: store.admin.currentPage,
		isMenuExpanded: store.admin.isMenuExpanded,

		adminsList: store.admin.admins,
		physiciansList: store.admin.physicians,
		techniciansList: store.admin.technicians,
	}
}
//
//
//
function mapDispatchToProps(dispatch){
	return {
		getTechniciansList(){
			dispatch(GetTechniciansList());
		},
		getPhysiciansList(){
			dispatch(GetPhysiciansList());
		},
		getAdminsList(){
			dispatch(GetAdminsList());
		},
	}
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( AdminBodyComponent );