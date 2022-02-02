//
//
// Combined Reducers
//
//
// Import the required function from Redux
import { combineReducers } from 'redux';
//
//
// Import all reducers that will combine to create the final Redux State Object
// 	example: import * as reducers from './reducers/...' (where each named function is exported)
// 	note: requires that each reducer be exported individually
//	import { exampleReducer } from './reducers/exampleReducer'; // remove: this is just an example
import { global } from './reducers/global';
import { auth } from './reducers/auth';
import { records } from './reducers/records';
import { admin } from './reducers/admin';
import { physician } from './reducers/physician';

//import { error } from './reducers/errors';
//
//
// Combine all reducers into a single root reducer
export const rootReducer = combineReducers({
	global,
	auth,
	records,
	admin,
	physician,
	//TODO: error (reducer)
});