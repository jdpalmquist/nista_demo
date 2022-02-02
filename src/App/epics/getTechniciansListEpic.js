//
//
// Get Technicians List Epic
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
export const getTechniciansListEpic = action$ => action$.pipe(
	ofType(Actions.GET_TECHNICIANS_LIST),
	mergeMap(action =>
		ajax({
			url: '/users/get/technicians',
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
						case Reactions.GET_TECHNICIANS_LIST_RES:
							return {
								type: Reactions.GET_TECHNICIANS_LIST_RES,
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