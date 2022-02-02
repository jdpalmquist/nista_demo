//
//
// Logout Epic
//
//
//
import { ajax } from 'rxjs/ajax';
import { ofType } from 'redux-observable';
import { mergeMap, pipe, map } from 'rxjs/operators';
//
//
//
import { 
	Actions, 
	Reactions, 
	ErrorReactions 
} from '../actions';
//
//
//
export const logoutEpic = action$ => action$.pipe(
	ofType(Actions.LOGOUT),
	mergeMap(action =>
		ajax({
			url: '/logout',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: action.payload
		}).pipe(
			map( 
				(response) => {
					//
					//
					//
					let res = response.response;
					console.log('DEBUG: logoutEpic --> AJAX response from srv: ', res);
					//
					//
					//					
					switch(res.type){
						//
						//
						//
						case Reactions.LOGOUT_RES:
							return {
								type: Reactions.LOGOUT_RES,
								payload: res.payload
							}
						break;
						//
						//
						//
						case ErrorReactions.SERVER_ERROR:
							return {
								type: ErrorReactions.SERVER_ERROR,
								payload: res.payload
							}
						break;
						//
						//
						//
						default:break;
					}
				}
			)
		)
	)
);