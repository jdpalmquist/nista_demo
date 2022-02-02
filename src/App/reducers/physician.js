//
//
//
// Physician Reducer
//
//
//
import { 
	Reactions,
	ErrorReactions 
} from '../actions';
//
//
// NOTE: all these data values are related to patients and patient records (sorry for wonky naming of "physician")
const initialState = {
	patientList: [],
	patientListCallComplete: false,
	selectList: [],

	/*view patient*/
	patientID: '',
	patientStatus: '',
	breast: 'left',
	/*demographics*/
	gender: '',
	age: '',
	ethnicity: '',
	sampleDate: '',
	/*patient med data*/
	bloodType: '',
	bloodOxygen: '',
	bloodPressure: '',
	weight: '',
	/*images*/
	images:[],
	numImages: 0,
	getImagesCallComplete: false,
	/*notes*/
	notes:[],

	analysisResults: {
		numProblemAreas: '0',
		tissueMusclePercentageLB: '0',
		tissueAdiposePercentageLB: '0',
		tissueMusclePercentageRB: '0',
		tissueAdiposePercentageRB: '0',
	}
}
//
//
//
export function physician(state = initialState, action) {
	//
	//
	//
	let data = null;
	let update = null;
	//
	//
	// temporary notes arrays
	let all = [];
	let t = []; //technicians
	let p = []; //physicians
	let a = []; //admins
	//
	//
	//
	switch(action.type){
		//
		//
		//
		case Reactions.SEARCH_RES:
			//
			//
			//
			update = {
				patientList: action.payload,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.FIND_ALL_RECORDS_RES:
			//
			//
			//
			update = {
				patientList: action.payload,
				patientListCallComplete: true,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.ADD_RECORD_TO_SELECT_LIST:
			//
			//
			//
			data = state.selectList;
			data.push(action.payload);
			//
			//
			//
			update = {
				selectList: data,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.REMOVE_RECORD_FROM_SELECT_LIST:
			//
			//
			//
			data = state.selectList;
			for(let i = 0; i < data.length; i++){
				//
				//
				//
				if(data[i] == action.payload){
					data.splice(i,1);	
				}
			}
			//
			//
			//
			update = {
				selectList: data,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.SET_VIEW_PATIENT_DATA:
			//
			//
			//
			for(let i = 0; i < state.patientList.length; i++){
				//
				//
				//
				if(action.payload == state.patientList[i]._id){
					data = state.patientList[i];
					break;
				}
			}
			//
			//
			//
			update = {
				patientID: action.payload,
				patientStatus: data.status,
				gender: data.gender,
				age: data.age,
				ethnicity: data.ethnicity,
				sampleDate: data.sampleDate,
				bloodType: data.bloodType,
				bloodOxygen: data.bloodOxygen,
				bloodPressure: data.bloodPressure,
				weight: data.weight,

				numProblemAreas: 0,
				tissueMusclePercentageLB: 0,
				tissueMusclePercentageRB: 0,
				tissueAdiposePercentageLB: 0,
				tissueAdiposePercentageRB: 0,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.GET_PATIENT_IMAGES_RES:
			//
			//
			//
			update = {
				images: action.payload,
				numImages: action.payload.length,
				getImagesCallComplete: true,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.CHANGE_BREAST:
			//
			//
			//
			update = {
				breast: action.payload,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.PHYSICIAN_VIEW_PATIENT:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			/*
			{
				"_id":{
					"$oid":"5f60eed38fcb734e0a473520"
				},
				"createdBy":{
					"$oid":"5f4afb224b2bcc4cdb4d6827"
				},
				"usertype":"admin",
				"createdOn":{
					"$numberInt":"1600188115"
				},
				"MRN":"F.mXviLQqwQUZVpFD3HRxuiz0yFrIG3jfrFW27NYc3Z7I5cOWutdK",
				"_SAFE_MRN":"$2b$15$F.mXviLQqwQUZVpFD3HRxuiz0yFrIG3jfrFW27NYc3Z7I5cOWutdK",
				"specimen_date":"8-23-2020",
				"gender":"Female",
				"dob_year":"1971",
				"dob_month":"1",
				"dob_day":"8",
				"age":"49",
				"ethnicity":"Caucasian",
				"religion":"Protestant",
				"technician":[],
				"physician":[],
				"admin":[],
				"docs":[
					{
						"name":"mammogram1.png",
						"path":"./uploads/F.mXviLQqwQUZVpFD3HRxuiz0yFrIG3jfrFW27NYc3Z7I5cOWutdK/mammogram1.png",
						"encoding":"7bit",
						"mimetype":"image/png",
						"size":{
							"$numberInt":"475387"
						}
					},
					{
						"name":"mammogram2.png",
						"path":"./uploads/F.mXviLQqwQUZVpFD3HRxuiz0yFrIG3jfrFW27NYc3Z7I5cOWutdK/mammogram2.png",
						"encoding":"7bit",
						"mimetype":"image/png",
						"size":{"$numberInt":"475387"}
					}
				]
			}
			*/
			//
			//
			//
			update = {
				recordID: data._id,
				MRN: data.MRN,
				_SAFE_MRN: data._SAFE_MRN,
				specimen_date: data.specimen_date,
				demographics: {
					gender: data.gender,
					age: data.age,
					ethnicity: data.ethnicity,
					religion: data.religion,
				},
				docs: data.docs,
				results: {

				},
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.PHYSICIAN_GET_NOTES_RES:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			update = {
				notes: data
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.PHYSICIAN_SAVE_NOTE_RES:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			let notes = state.notes;
			notes.push(data);
			//
			//
			//
			update = {
				notes: notes
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.PHYSICIAN_PUBLISH_NOTE_RES:
			//
			//
			//
			update = {};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		default:
			return state;
		break;
	}
}