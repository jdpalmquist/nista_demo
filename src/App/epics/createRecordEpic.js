//
//
// Create Record Epic
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
export const createRecordEpic = action$ => action$.pipe(
	ofType(Actions.CREATE_RECORD),
	mergeMap(action =>
		ajax({
			url: '/records/create',
			method: 'POST',
			headers: {
				//'Content-Type': 'multipart/form-data', // 'application/x-www-form-urlencoded', 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: action.payload
		}).pipe(map( 
				(response) => {

					let res = response.response;

					switch(res.type){
						case Reactions.CREATE_RECORD_RES:
							return {
								type: Reactions.CREATE_RECORD_RES,
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