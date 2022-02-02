//
//
// Upload Image Epic
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
export const uploadImageEpic = action$ => action$.pipe(
	ofType(Actions.UPLOAD_IMAGE),
	mergeMap(action =>
		ajax({
			url: '/records/image/upload',
			method: 'PUT',
			headers: {
				//'Content-Type': 'application/x-www-form-urlencoded', //'multipart/form-data', // 'application/json',
				'rxjs-custom-header': 'Rxjs'
			},
			body: action.payload
		}).pipe(map( 
				(response) => {

					let res = response.response;

					switch(res.type){
						case Reactions.UPLOAD_IMAGE_RES:
							return {
								type: Actions.GET_PATIENT_IMAGES,
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