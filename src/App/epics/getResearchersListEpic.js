//
//
// Get Researchers List Epic
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
export const getResearchersListEpic = action$ => action$.pipe(
	ofType(Actions.GET_PHYSICIANS_LIST),
	mergeMap(action =>
		ajax({
			url: '/users/get/researchers',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: {}
		}).pipe(map( 
				(response) => {

					let res = response.response;

					switch(res.type){
						case Reactions.GET_RESEARCHERS_LIST_RES:
							return {
								type: Reactions.GET_RESEARCHERS_LIST_RES,
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