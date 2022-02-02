//
//
//
// Admin Connect File
//
//
//
import { connect } from 'react-redux'
import PatientComponent from '../components/patient.jsx';
//
//
//
import {
	HideMenu,
	ShowMenu,
	Navigate,
	Logout,

	GetPatientImages,
	UploadImage,
	ChangeBreast,

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
		patientStatus: store.physician.patientStatus,
		breast: store.physician.breast,
		analysisResults: store.physician.analysisResults,

		images: store.physician.images,
		numImages: store.physician.numImages,
		getImagesCallComplete: store.physician.getImagesCallComplete,
			
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
		getPatientImages(patientID){
			dispatch(GetPatientImages(patientID));
		},
		uploadImage(fd){
			dispatch(UploadImage(fd));
		},
		changeBreast(breast){
			dispatch(ChangeBreast(breast));
		}
	}
}
//
//
//
export default connect( mapStateToProps, mapDispatchToProps )( PatientComponent );