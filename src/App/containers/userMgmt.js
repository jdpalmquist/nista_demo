//
//
//
// Admin Connect File
//
//
//
import { connect } from 'react-redux'
import UserMgmtComponent from '../components/userMgmt.jsx';
//
//
//
import {
	GetTechniciansList,
	GetPhysiciansList,
	GetResearchersList,
	GetAdminsList,
	CreateUser,
} from '../actions';
//
//
//
function mapStateToProps(store) {
	return {
		username: store.auth.username,
		isAuthorized : store.auth.isAuthorized,

		technicians: store.admin.technicians,
		physicians: store.admin.physicians,
		researchers: store.admin.researchers,
		admins: store.admin.admins,

		cols: store.global.cols,
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
		getResearchersList(){
			dispatch(GetResearchersList());
		},
		getAdminsList(){
			dispatch(GetAdminsList());
		},
		createUser(user){
			dispatch(CreateUser(user));
		}
	}
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( UserMgmtComponent );