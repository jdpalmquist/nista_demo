//
//
// Get All Records Epic
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
	ErrorReactions,
} from '../actions';
//
//
//
export const findAllRecordsEpic = action$ => action$.pipe(
	ofType(Actions.FIND_ALL_RECORDS),
	mergeMap(action =>
		ajax({
			url: '/records/get/all',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: null,
		}).pipe(map( 
				(response) => {

					let res = response.response;

					switch(res.type){
						case Reactions.FIND_ALL_RECORDS_RES:
							return {
								type: Reactions.FIND_ALL_RECORDS_RES,
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