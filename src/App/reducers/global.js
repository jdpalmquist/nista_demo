//
//
// Global Reducer
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
	mode: "development",
	release: "alpha",
	version: "0.0.1",

	isMenuExpanded: true,

	/* static graphic layout values */
	cols:{
		md: {
			side: 3,
			center: 6,
		},
		sm: {
			side: 1,
			center: 10,
			
		},
	}
}
//
//
//
export function global(state = initialState, action) {
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
		case Reactions.HIDE_MENU:
			//
			//
			//
			update = {
				isMenuExpanded: false,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.SHOW_MENU:
			//
			//
			//
			update = {
				isMenuExpanded: true,
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