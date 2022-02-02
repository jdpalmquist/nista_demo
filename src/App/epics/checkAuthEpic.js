//
//
// Check Auth Epic
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
export const checkAuthEpic = action$ => action$.pipe(
	ofType(Actions.AUTH_CHECK),
	mergeMap(action =>
		ajax({
			url: '/isauthorized',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: {}
		}).pipe(map( 
				(response) => {

					let res = response.response;

					switch(res.type){
						case Reactions.AUTH_CHECK_RES:
							return {
								type: Reactions.AUTH_CHECK_RES,
								payload: res.payload
							}
						break;

						case ErrorReactions.SERVER_ERROR:
							return {
								type: ErrorReactions.SERVER_ERROR,
								payload: res.payload
							}
						break;

						default: break;
					} 
				} 
			)
		)
	)
);