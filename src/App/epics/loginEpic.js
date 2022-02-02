//
//
// Login Epic
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
export const loginEpic = action$ => action$.pipe(
	ofType(Actions.LOGIN),
	mergeMap(action =>
		ajax({
			url: '/login',
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
					//
					//
					//					
					switch(res.type){
						//
						//
						//
						case Reactions.LOGIN_RES:
							return {
								type: Reactions.LOGIN_RES,
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