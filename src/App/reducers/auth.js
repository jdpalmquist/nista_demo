//
//
// Auth Reducer
//
//
//
import { 
	Reactions,
	ErrorReactions,
} from '../actions';
//
//
//
const initialState = {
	uid: '',
	userName: '',
	acctType: '',
	isAuthorized: false,
	matchFound: 0, // key: -1: not found, 0: neutral state, 1: found
	page: 'login',
}
//
//
//
function auth(state = initialState, action) {
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
		case Reactions.AUTH_CHECK_RES:
			//
			//
			//
			data = action.payload;
			//
			//
			//
			update = { 
				uid: data.uid,
				userName: data.username,
				acctType: data.acctType,
				isAuthorized: data.isAuthorized,
				page: data.acctType,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.LOGIN_RES: 
			//
			//
			//
			data = action.payload;
			//
			//
			//
			update = {
				uid: data.uid,
				userName: data.username,
				acctType: data.acctType,
				isAuthorized: data.isAuthorized,
				matchFound: data.matchFound,
				page: data.acctType,
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.RESET_NO_MATCH_FOUND: 
			//
			//
			//
			return Object.assign({}, state, {matchFound: 0});
		break;
		//
		//
		//
		case Reactions.LOGOUT_RES: 
		case ErrorReactions.NOT_LOGGED_IN: 
		case ErrorReactions.NOT_AUTHORIZED:
			//
			//
			//
			update = {
				uid: "",
				userName: "",
				acctType: "",
				isAuthorized: false,
				matchFound: 0,
				page: 'login',
			};
			//
			//
			//
			return Object.assign({}, state, update);
		break;
		//
		//
		//
		case Reactions.GO_TO_PAGE:
			//
			//
			//
			return Object.assign({}, state, {page: action.payload.page});
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
export { auth }