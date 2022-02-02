//
//
//
// Action Types
//
//
//
const Actions = {
	"AUTH_CHECK": 						"AUTH_CHECK", 
	"LOGIN": 							"LOGIN",
	"LOGOUT": 							"LOGOUT",
	"CREATE_RECORD": 					"CREATE_RECORD",
	"DELETE_RECORD": 					"DELETE_RECORD",
	"UPLOAD_IMAGE": 					"UPLOAD_IMAGE",
	"DELETE_IMAGE": 					"DELETE_IMAGE",
	"GET_TECHNICIANS_LIST": 			"GET_TECHNICIANS_LIST",
	"GET_PHYSICIANS_LIST": 				"GET_PHYSICIANS_LIST",
	"GET_RESEARCHERS_LIST": 			"GET_RESEARCHERS_LIST",
	"GET_ADMINS_LIST": 					"GET_ADMINS_LIST",
	"CREATE_USER": 						"CREATE_USER",
	"SEARCH": 							"SEARCH",
	"FIND_ALL_RECORDS": 				"FIND_ALL_RECORDS",
	"GET_PATIENT_IMAGES": 				"GET_PATIENT_IMAGES",
	"PHYSICIAN_GET_NOTES": 				"PHYSICIAN_GET_NOTES",
	"PHYSICIAN_SAVE_NOTE": 				"PHYSICIAN_SAVE_NOTE",
	"PHYSICIAN_PUBLISH_NOTE": 			"PHYSICIAN_PUBLISH_NOTE",

};
//
//
//
const Reactions = {
	"AUTH_CHECK_RES":					"AUTH_CHECK_RES",
	"LOGOUT_RES": 		 				"LOGOUT_RES",
	"LOGIN_RES": 						"LOGIN_RES",
	"RESET_NO_MATCH_FOUND": 			"RESET_NO_MATCH_FOUND",
	"GO_TO_PAGE": 						"GO_TO_PAGE",
	"CREATE_RECORD_RES": 				"CREATE_RECORD_RES",
	"DELETE_RECORD_RES": 				"DELETE_RECORD_RES",
	"ADD_RECORD_TO_SELECT_LIST": 		"ADD_RECORD_TO_SELECT_LIST",
	"REMOVE_RECORD_FROM_SELECT_LIST": 	"REMOVE_RECORD_FROM_SELECT_LIST",
	"UPLOAD_IMAGE_RES": 				"UPLOAD_IMAGE_RES",
	"DELETE_IMAGE_RES": 				"DELETE_IMAGE_RES",
	"CHANGE_BREAST": 					"CHANGE_BREAST",
	"GET_TECHNICIANS_LIST_RES": 		"GET_TECHNICIANS_LIST_RES",
	"GET_PHYSICIANS_LIST_RES": 			"GET_PHYSICIANS_LIST_RES",
	"GET_RESEARCHERS_LIST_RES": 		"GET_RESEARCHERS_LIST_RES",
	"GET_ADMINS_LIST_RES": 				"GET_ADMINS_LIST_RES",
	"CREATE_USER_RES": 					"CREATE_USER_RES",
	"SEARCH_RES": 						"SEARCH_RES",
	"FIND_ALL_RECORDS_RES": 			"FIND_ALL_RECORDS_RES",
	"SET_VIEW_PATIENT_DATA": 			"SET_VIEW_PATIENT_DATA",
	"GET_PATIENT_IMAGES_RES": 			"GET_PATIENT_IMAGES_RES",
	"PHYSICIAN_GET_NOTES_RES": 			"PHYSICIAN_GET_NOTES_RES",
	"PHYSICIAN_SAVE_NOTE_RES": 			"PHYSICIAN_SAVE_NOTE_RES",
	"PHYSICIAN_PUBLISH_NOTE_RES": 		"PHYSICIAN_PUBLISH_NOTE_RES",
	"HIDE_MENU": 						"HIDE_MENU",
	"SHOW_MENU": 						"SHOW_MENU",
};
//
//
//
const ErrorReactions = {
	"NOT_LOGGED_IN": 					"NOT_LOGGED_IN",
	"SERVER_ERROR": 					"SERVER_ERROR",
	"NOT_AUTHORIZED": 					"NOT_AUTHORIZED",

};
//
//
// Action Creators
//
//
//
function CheckAuth(){ 
	return { 
		type: Actions.AUTH_CHECK 
	};
};
//
//
//
function Login(email, password){
	return {
		type: Actions.LOGIN,
		payload: {
			email: email,
			password: password
		}
	};
};
//
//
//
function ResetNoMatchFound(){
	return {
		type: Reactions.RESET_NO_MATCH_FOUND,
	};
}
//
//
//
function Navigate(pagename){
	return {
		type: Reactions.GO_TO_PAGE,
		payload: {
			page: pagename,
		}
	};
}
//
//
//
function Logout(){
	return {
		type: Actions.LOGOUT,
	};
}
//
//
//
function CreateRecord(formData){
	return {
		type: Actions.CREATE_RECORD,
		payload: formData
	};
}
//
//
//
function DeleteRecord(patientID){
	return {
		type: Actions.DELETE_RECORD,
		payload: patientID
	};
}
//
//
//
function AddRecordToSelectList(patientID){
	return {
		type: Reactions.ADD_RECORD_TO_SELECT_LIST,
		payload: patientID,
	};
}
//
//
//
function RemoveRecordFromSelectList(patientID){
	return {
		type: Reactions.REMOVE_RECORD_FROM_SELECT_LIST,
		payload: patientID
	}
}
//
//
//
function GetTechniciansList(){
	return {
		type: Actions.GET_TECHNICIANS_LIST
	};
}
//
//
//
function GetPhysiciansList(){
	return {
		type: Actions.GET_PHYSICIANS_LIST
	};
}
//
//
//
function GetResearchersList(){
	return {
		type: Actions.GET_RESEARCHERS_LIST
	};
}
//
//
//
function GetAdminsList(){
	return {
		type: Actions.GET_ADMINS_LIST
	};
}
//
//
//
function HideMenu(){
	return {
		type: Reactions.HIDE_MENU,
	};
}
//
//
//
function ShowMenu(){
	return {
		type: Reactions.SHOW_MENU,
	};
}
//
//
//
function CreateUser(user){
	return {
		type: Actions.CREATE_USER,
		payload: user
	};
}
//
//
//
function Search(query){
	return {
		type: Actions.SEARCH,
		payload: query
	};
}
//
//
//
function FindAllRecords(){
	return {
		type: Actions.FIND_ALL_RECORDS,
	};
}
//
//
//
function SetViewPatientData(patientID){
	return {
		type: Reactions.SET_VIEW_PATIENT_DATA,
		payload: patientID,
	};
}
//
//
//
function GetPatientImages(patientID){
	return {
		type: Actions.GET_PATIENT_IMAGES,
		payload: patientID,
	}
}
//
//
//
function ChangeBreast(breast){
	return {
		type: Reactions.CHANGE_BREAST,
		payload: breast,
	};
}
//
//
//
function PhysicianGetNotes(MRN){
	return {
		type: Actions.PHYSICIAN_GET_NOTES,
		payload: {
			MRN: MRN
		}
	};
}
//
//
//
function PhysicianSaveNote(obj){
	return {
		type: Actions.PHYSICIAN_SAVE_NOTE,
		payload: obj
	};
}
//
//
//
function PhysicianPublishNote(obj){
	return {
		type: Actions.PHYSICIAN_PUBLISH_NOTE,
		payload: obj
	}
}
//
//
//
function UploadImage(fd){
	return {
		type: Actions.UPLOAD_IMAGE,
		payload: fd
	};
}
//
//
//
function DeleteImage(imageID, patientID){
	return {
		type: Actions.DELETE_IMAGE,
		payload: {
			imageID: imageID,
			patientID: patientID
		}
	}
}
//
//
//
export { 
	/* Actions */
	Actions,
	Reactions,
	ErrorReactions,

	/* Action Creators */
	CheckAuth, 
	Login,
	ResetNoMatchFound,
	Navigate,
	Logout,
	Search,
	FindAllRecords,

	HideMenu,
	ShowMenu,
	
	/* Create Record Action Creators */
	CreateRecord,
	DeleteRecord,
	AddRecordToSelectList,
	RemoveRecordFromSelectList,

	/*Physician Action Creators*/
	SetViewPatientData,
	ChangeBreast,
	GetPatientImages,
	UploadImage,
	DeleteImage,
	
	PhysicianGetNotes,
	PhysicianSaveNote,
	PhysicianPublishNote,

	/* Admin Action Creators */
	GetTechniciansList,
	GetPhysiciansList,
	GetResearchersList,
	GetAdminsList,
	CreateUser,

};