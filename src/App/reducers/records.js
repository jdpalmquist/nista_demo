//
//
// Create Record Reducer
//
//
//
import { 
	Actions,
	Reactions,
	ErrorReactions,
} from '../actions';
//
//
//
const initialState = {
	showModal: false,
	modalMessage: '',

	docs: [],
	drafts: [],
}
//
//
//
function records(state = initialState, action) {
	//
	//
	//
	let data = null;
	let update = null;
	//
	//
	//
	switch(action.type){
		//
		//
		//
		case Reactions.CREATE_RECORD_RES:
			//
			//
			//
			let n = null;
			let data = action.payload;
			if(data.success === true){
				n = {
					showModal: true,
					modalMessage: 'The record was successfully created!'
				};
			}
			else{
				n = {
					showModal: true,
					modalMessage: 'The create record process failed!'
				};
			}
			//
			//
			//
			return Object.assign({}, state, n);
		break;
		//
		//
		//
		case Reactions.CLOSE_MODAL:
			//
			//
			//
			return Object.assign({}, state, {showModal: false, modalMessage: ''});
		break;
		//
		//
		//
		case Reactions.SEARCH_RES: 
			//
			//
			//
			return Object.assign({}, state, {docs: action.payload});
		break;
		//
		//
		//
		default:
			//
			//
			//
			return state;
		break;
	}
}
//
//
//
export { records }