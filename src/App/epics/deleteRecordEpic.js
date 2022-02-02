//
//
// Delete Record Epic
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
export const deleteRecordEpic = action$ => action$.pipe(
	ofType(Actions.DELETE_RECORD),
	mergeMap(action =>
		ajax({
			url: '/records/delete',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: {patientID: action.payload}
		}).pipe(map( 
				(response) => {

					let res = response.response;

					switch(res.type){
						case Reactions.DELETE_RECORD_RES:
							return {
								type: Actions.FIND_ALL_RECORDS,
								payload: null,
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