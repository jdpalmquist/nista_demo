//
//
// Create User Epic
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
export const createUserEpic = action$ => action$.pipe(
	ofType(Actions.CREATE_USER),
	mergeMap(action =>
		ajax({
			url: '/users/create',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: action.payload
		}).pipe(map( 
				(response) => {

					let res = response.response;

					switch(res.type){
						case Reactions.CREATE_USER_RES:
							return {
								type: Reactions.CREATE_USER_RES,
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