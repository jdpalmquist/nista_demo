//
//
// Physician Publish Note Epic
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
export const physicianPublishNoteEpic = action$ => action$.pipe(
	ofType(Actions.PHYSICIAN_PUBLISH_NOTE),
	mergeMap(action =>
		ajax({
			url: '/records/publish/note',
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
						case Reactions.PHYSICIAN_PUBLISH_NOTE_RES:
							return {
								type: Reactions.PHYSICIAN_PUBLISH_NOTE_RES,
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