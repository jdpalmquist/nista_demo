//
//
// Admin Reducer
//
//
//
import { 
	Reactions,
	ErrorReactions 
} from '../actions';
//
//
//
const initialState = {
	technicians: [],
	physicians: [],
	researchers: [],
	admins: [],
}
//
//
//
export function admin(state = initialState, action) {
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
		case Reactions.GET_TECHNICIANS_LIST_RES:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			update = {
				technicians: data.list
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.GET_PHYSICIANS_LIST_RES:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			update = {
				physicians: data.list
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.GET_RESEARCHERS_LIST_RES:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			update = {
				researchers: data.list
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.GET_ADMINS_LIST_RES:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			update = {
				admins: data.list
			};
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