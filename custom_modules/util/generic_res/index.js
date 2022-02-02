//
//
//
// RESPONSE ERROR SENDER
//
// NOTE: 	This module is designed to provide methods to send generic response codes
// 			to a client system that is running React/Redux/RXJS and their AJAX request
//			needs to complete a request that was issued. These functions will return
// 			generic JSON objects with HTTP error code types
//
//
const Fs = require('fs');
//
//
//
function send_error(res, code, end = false){
	//
	//
	//
	res.send({
		type: 'SERVER_ERROR',
		payload: {
			code: code,
			msg: "The server has experienced an internal error processing your request"			
		}
	});
	//
	//
	//
	if(end === true){
		res.end();
	}
}
//
//
//
function send_user_not_logged_in(req, res, end = false){
	//
	//
	//
	req.session.auth = {
		isAuthorized: false,
		uid: '',
	};
	//
	//
	//
	res.send({
		type: 'NOT_LOGGED_IN',
		payload: {
			msg: 'You must be logged in to view this page.'
		}
	});
	//
	//
	//
	if(end === true){
		res.end();
	}	
}
//
//
//
module.exports = {
	sendError: send_error,
	sendUserNotLoggedIn: send_user_not_logged_in,
};