//
//
// Search Epic
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
export const searchEpic = action$ => action$.pipe(
	ofType(Actions.SEARCH),
	mergeMap(action =>
		ajax({
			url: '/records/search',
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
						case Reactions.SEARCH_RES:
							return {
								type: Reactions.SEARCH_RES,
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