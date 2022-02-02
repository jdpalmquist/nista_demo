//
//
// Get Patient Images Epic
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
export const getPatientImagesEpic = action$ => action$.pipe(
	ofType(Actions.GET_PATIENT_IMAGES),
	mergeMap(action =>
		ajax({
			url: '/records/get/images',
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
						case Reactions.GET_PATIENT_IMAGES_RES:
							return {
								type: Reactions.GET_PATIENT_IMAGES_RES,
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