//
//
//
// API Module
//
//
//
const Fs = require('fs');
//
//
// Require NPM Modules
const Moment = require('moment');
const Geoip = require('geoip-lite');
const Bcrypt = require('bcrypt');
const Mongodb = require('mongodb');
//
//
// Require Custom Modules
let db = require('../db');
let cfg = require('../cfg');
let generic = require('../util/generic_res');
let funcs = require('../util/funcs');
//
//
//
function isAuthorized(req, res){
	//
	//
	//
	let payload = null;
	//
	//
	//
	let auth = req.session.auth;
	//
	//
	//
	if( typeof auth != 'undefined' && 
		auth != null && 
		typeof auth.isAuthorized != 'undefined' &&
		auth.isAuthorized === true ){
		//
		//
		//
		payload = {
			uid: auth.uid,
			username: auth.username,
			acctType: auth.acctType,
			isAuthorized: auth.isAuthorized,
		};
	}
	else {
		//
		//
		//
		payload = {
			uid: '',
			username: '',
			acctType: '',
			isAuthorized: false,
		};
	}
	//
	//
	// 
	res.send({
		type: "AUTH_CHECK_RES",
		payload: payload
	});
	//
	//
	//
	res.end();
	//
	//
	//
	return;
}
//
//
//
function doesEmailExist(req, res){
	//
	//
	//
	let data = req.body;
	//
	//
	//
	if(data.email != null && data.email != '' && typeof data.email != 'undefined'){
		//
		//
		//
		let Users = db.collection('users');
		//
		//
		//
		try{
			//
			//
			//
			Users.findOne({email: data.email}, function(err, doc){
				//
				//
				//
				if(err){
					//
					//
					//
					console.error('ERROR: API --> doesEmailExist() --> findOne() --> err: ', err);
					
					//
					//
					//
					generic.sendError(res, 500, true);
				}
				else{
					//
					//
					//
					console.log('DEBUG: API --> doesEmailExist() --> findOne() --> doc: ', doc);
					//
					//
					//
					let exists = null;
					//
					//
					//
					if(typeof doc != 'undefined' && doc != null && typeof doc._id != 'undefined'){
						//
						//
						// Record found, the email already exists in the system
						exists = true;
					}
					else{
						//
						//
						// Record NOT found, the email does NOT exist in the system
						exists = false;
					}
					//
					//
					//
					res.send({
						exists: exists
					});
				}
			});	
		}
		catch(e){
			//
			//
			//
			console.error('ERROR: API --> doesEmailExist() -->  Exception: ', e);
			//
			//
			//
			generic.sendError(res, 500, true);
		}
	}
	else{
		//
		//
		// Missing Input Parameter: email
		res.end();
	}
}
//
//
//
function resetPass(req, res){
	//
	//
	//
	console.error('TODO: finish implementing resetPass() endpoint!!');
	//
	//
	//
	res.end();
}
//
//
//
function login(req, res){
	//
	//
	//
	let data = req.body;
	//console.log('DEBUG: API --> login() --> data: ', data);
	//
	//
	//
	if( !req.session.hasOwnProperty('auth') || 
		typeof req.session.auth == 'undefined' || 
		req.session.auth == null ){
		//
		//
		//
		//console.log('DEBUG: API --> login() --> created user session');
		//
		//
		//
		req.session.auth = {
			uid: '',
			username: '',
			acctType: '',
			isAuthorized: false,
		};
	}
	//
	//
	//
	let auth = req.session.auth;
	//
	//
	// session found, already logged in...
	if(auth.isAuthorized === true){
		//
		//
		//
		//console.log('DEBUG: API --> login() --> user already logged in');
		//
		//
		//
		res.send({
			type: "LOGIN_RES",
			payload: {
				uid: req.session.auth.uid,
				username: req.session.auth.username,
				acctType: req.session.auth.acctType,
				isAuthorized: auth.isAuthorized,
				matchFound: 1,
			}
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
	else{
		//
		//
		//
		let Users = db.collection('users');
		//
		//
		//
		let query = {
			$or:[
				{email: data.email},
				{username: data.email}, //the user might have entered their username into this field
			]
		};
		//
		//
		//
		try {
			//
			//
			//
			//console.log('DEBUG: API --> Login() --> querying db, query = ', query);
			//
			//
			//
			Users.findOne(query, function(err, doc){
				//
				//
				//
				if(err){
					//
					//
					//
					console.error('ERROR: API --> login() --> Users.findOne() --> err: ', err);
					//
					//
					//
					generic.sendError(res, 500, true);
				}
				else if(typeof doc != 'undefined' && doc != null){
					//
					//
					//
					let hashed_password = doc.password;
					//
					//
					// Load hash from your password DB.
					Bcrypt.compare(data.password, hashed_password, function(err, result) {
						//
						// 
						//
						if(result === true){
							//
							//
							//
							//console.log('DEBUG: API --> login() --> bcrypt hash comparison success!');
							//
							//
							//
							req.session.auth = Object.assign({}, {
								uid: doc._id,
								username: doc.username,
								acctType: doc.acctType,
								isAuthorized: true
							});
							//
							//
							//
							req.session.user = Object.assign({}, {
								uid: doc._id,
								username: doc.username,
								email: doc.email,
								acctType: doc.acctType,
								status: 'active',
								langpref: 'en-us',
								timezone: null,
								useragent: req.useragent,
								ip: req.ip,
							});
							//
							//
							//
							res.send({
								type: "LOGIN_RES",
								payload: {
									uid: doc._id,
									username: doc.username,
									acctType: doc.acctType,
									isAuthorized: true,
									matchFound: 1,
								}
							});
						}
						else{
							//
							//
							//
							//console.log('DEBUG: API --> login() --> bcrypt hash comparison failed!');
							//
							//
							//
							res.send({
								type: "LOGIN_RES",
								payload: {
									uid: '',
									acctType: '',
									isAuthorized: false,
									matchFound: -1,
								}
							});
						}
					});
				}
				else{
					//
					//
					//
					//console.log('DEBUG: API --> login() --> no matching user found!');
					//
					//
					//
					res.send({
						type: "LOGIN_RES",
						payload: {
							uid: '',
							acctType: '',
							isAuthorized: false,
							matchFound: -1,
						}
					});
				}
			});
		}
		catch(e){
			//
			//
			//
			console.error('ERROR: API --> login() --> Users.findOne() --> Exception: ', e);
			//
			//
			//
			generic.sendError(res, 500, true);
			//
			//
			//
			return;
		}
	}
}
//
//
//
function logout(req, res){
	//
	//
	//
	req.session.auth = null;
	//
	//
	//
	res.send({
		type: "LOGOUT_RES",
		payload: {
			uid: '',
			username: '',
			acctType: '',
			isAuthorized: false,
		}
	});
}
//
//
//
function DEPRECATED_createRecord(req, res){
	//
	//
	// Auth Check
	if( req.session.auth.isAuthorized === false ){
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED'
		});
		//
		//
		//
		return res.end();
	}
	//
	//
	// form fields will be in req.body
	let fields = req.body;
	//
	//
	// uploaded files embedded by the "multer" library
	let files = req.files;
	//
	//
	//
	let _UNSAFE_MRN = fields.MRN;
	let _DIR = '';
	//
	//
	//
	let userid = req.session.auth.uid;
	let usertype = req.session.auth.acctType;
	//
	//
	//
	try{
		//
		//
		//
		Bcrypt.hash(_UNSAFE_MRN, cfg.bcrypt.saltRounds, function(err, _SAFE_MRN) {
		    //
		    //
		    //
		    if(err){
		    	//
		    	//
		    	//
		    	console.error('ERROR: API --> createRecord() --> Bcrypt error: ', err);
		    	//
		    	//
		    	//
		    	generic.sendError(res, 500, true);
		    	//
		    	//
		    	//
		    	return;
		    }
		    else{
		    	//
		    	// hash successful
		    	//
		    	let hash = funcs.cleanHash(_SAFE_MRN);
		    	//
		    	//
		    	// 
			    _DIR = cfg.server.upload.dir + hash + '/';
			    //
			    //
			    // 
			    // NOTE: using the synchronous method is BLOCKING the main thread for the 
			    //		 entire server application. This call is made once right here, and
			   	//		 needs to be this way to ensure the directory exists before the next
			   	//		 series of file operations.
			    if(!Fs.existsSync(_DIR)){
			    	//
			    	//
			    	//
			    	Fs.mkdirSync(_DIR);
			    }
			    //
			    //
			    //
			    let oldpath = null;
			    let newpath = null;
			    let file = null;
			    let docs = [];
			    //
			    //
			    //
			    /*
					example file object inside the req.files array: 

					{
					    fieldname: 'uploads',
					    originalname: '7atoezktoh951.jpg',
					    encoding: '7bit',
					    mimetype: 'image/jpeg',
					    destination: '/tmp/',
					    filename: 'f7e9874e10e1a384e72f354adf1fb150',
					    path: '/tmp/f7e9874e10e1a384e72f354adf1fb150',
					    size: 76158
					},
				*/
			    //
			    //
			    //
			    for(let i = 0; i < files.length; i++){
			    	//
			    	//
			    	//
			    	file = files[i];
			    	//
			    	//
			    	//
			    	oldpath = file.path;
			    	newpath = _DIR + file.originalname;
			    	//
			    	//
			    	//
			    	docs.push({
			    		name: file.originalname,
			    		path: newpath,
			    		encoding: file.encoding,
			    		mimetype: file.mimetype,
			    		size: file.size,
			    	});
			    	//
			    	//
			    	// Move the file from temp upload dir to final location
			    	Fs.rename(oldpath, newpath, function(err){ if(err) console.error('ERROR: API --> createRecord() --> (MOVING FILE) --> Fs.rename() --> err: ', err) });
			    }
			    //
				//
				//
				let createdOn = Moment().unix();
			    //
			    //
			    //
			    let Records = db.collection('records');
			    //
			    //
			    //
			    let record = {
			    	createdBy: userid,
			    	usertype: usertype,
			    	createdOn: createdOn,
			    	MRN: hash, // safe hash -- can be used as a dir name for images
			    	_SAFE_MRN: _SAFE_MRN, //this is the full hash, including salt & rounds
			    
			    	/*demographics*/
			    	specimen_date: fields.specimen_date,
			    	gender: fields.gender,
			    	dob_year: fields.dob_year,
			    	dob_month: fields.dob_month,
			    	dob_day: fields.dob_day,
			    	age: fields.age,
			    	ethnicity: fields.ethnicity,
			    	religion: fields.religion,			    		
		    	
		    		/*files and images*/
			    	docs: docs, //array of objects
			    	
			    	/*results ???? */
			    };
			    //
			    //
			    //
			    Records.insert(record, function(err, doc){
			    	//
			    	//
			    	//
			    	if(err){
			    		//
			    		//
			    		//
			    		console.error('ERROR: API --> createRecord() --> Records.insert() --> err: ', err);
			    		//
			    		//
			    		//
			    		generic.sendError(res, 500, true);
			    		//
			    		//
			    		//
			    		return;
			    	}
			    	else{
			    		//
			    		//
			    		//
			    		res.send({
							type: 'CREATE_RECORD_RES',
							payload: {
								success: true,
								record: doc,
							}
						});
			    	}
			    });
			}
		});
	}
	catch(e){
		//
		//
		//
		console.error('ERROR: API --> createRecord() --> exception: ', e);
		//
    	//
    	//
    	generic.sendError(res, 500, true);
    	//
    	//
    	//
    	return;
	}
}
//
//
//
function createRecord(req, res){
	//
	//
	// Auth Check
	if( req.session.auth.isAuthorized === false ){
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED'
		});
		//
		//
		//
		return res.end();
	}
	//
	//
	//
	let data = req.body;
	//
	//
	//
	let createdOn = Moment().unix();
    //
    //
    //
    let Records = db.collection('records');
    //
    //
    //
    let record = {
    	createdBy: req.session.auth.uid,
    	usertype: req.session.auth.acctType,
    	createdOn: createdOn,
    	/*demographics*/
    	gender: data.gender,
    	age: data.age,
    	ethnicity: data.ethnicity,
    	sampleDate: data.sampleDate,
    	/*patient med data*/
    	bloodType: data.bloodType,
    	bloodOxygen: data.bloodOxygen,
    	bloodPressure: data.bloodPressure,
    	weight: data.weight,
    	status: 'pending',
    	numProblemAreas: 0,
    	tissueMusclePercLB: 0,
    	tissueMusclePercRB: 0,
    	tissueAdiposePercLB: 0,
    	tissueAdiposePercRB: 0,
    };
    //
    //
    //
    Records.insert(record, function(err, doc){
    	//
    	//
    	//
    	if(err){
    		//
    		//
    		//
    		console.error('ERROR: API --> createRecord() --> Records.insert() --> err: ', err);
    		//
    		//
    		//
    		generic.sendError(res, 500, true);
    		//
    		//
    		//
    		return;
    	}
    	else{
    		//
    		//
    		//
    		res.send({
				type: 'CREATE_RECORD_RES',
				payload: {
					success: true,
					record: doc,
				}
			});
    	}
    });
}
//
//
//
function deleteRecord(req, res){
	//
	//
	// Auth Check
	if( req.session.auth.isAuthorized === false ){
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED'
		});
		//
		//
		//
		return res.end();
	}
	//
	//
	//
	let data = req.body;
	//
	//
	//
	if(data.patientID !== null && data.patientID !== ''){
		//
	    //
	    //
	    let Images = db.collection('images');
	    let Records = db.collection('records');
	    //
	    //
	    //
	    let imageQuery = {
	    	patientID: data.patientID
	    };
	    let recordQuery = {
	    	_id: new Mongodb.ObjectID(data.patientID)
	    };
	    //
	    //
	    //
	    Images.find(imageQuery, function(err, docs){
	    	//
	    	//
	    	//
	    	if(err){
	    		//
	    		//
	    		//
	    		console.error('ERROR: deleteRecord() --> Images.find() --> err: ', err);
	    		//
	    		//
	    		//
	    		generic.sendError(res, 500, true);
	    		//
	    		//
	    		//
	    		res.end();
	    		//
	    		//
	    		//
	    		return;
	    	}
	    	else{
	    		//
	    		//
	    		//
	    		if(docs.length > 0){
	    			//
	    			//
	    			//
	    			let image = null;
	    			for(let i = 0; i < docs.length; i++){
	    				//
	    				//
	    				//
	    				image = docs[i];
	    				//
	    				//
	    				//
	    				Fs.unlinkSync(image.path);
	    				console.log('DEBUG: deleteRecord() --> unlinking image at index ' + i);
	    			}
    				//
    				//
    				//
    				Fs.rmdirSync('./uploads/' + data.patientID);
    				console.log('DEBUG: deleteRecord() --> removing patient image directory');
	    			//
	    			//
	    			//
	    			Images.remove(imageQuery, function(err){
	    				console.log('DEBUG: deleteRecord() --> removed all images');
	    			});
	    			//
	    			//
	    			//
	    			Records.remove(recordQuery, function(err){
	    				console.log('DEBUG: deleteRecord() --> removed patient record');
	    			});
	    		}
	    		else{
	    			//
	    			//
	    			//
	    			Records.remove(recordQuery, function(err, res){
	    				if(err)
	    					console.error('ERROR: deleteRecord() --> err: ', err);
	    			});
	    		}
	    		//
	    		//
	    		//
	    		res.send({
	    			type: 'DELETE_RECORD_RES',
	    			payload: true,
	    		});
	    		//
	    		//
	    		//
	    		res.end();
	    	}
	    });
	}
	else{
		//
		//
		//
		generic.sendError(res, 500, true);
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function uploadImage(req, res){
	//
	//
	// Auth Check
	if( req.session.auth.isAuthorized === false ){
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED'
		});
		//
		//
		//
		return res.end();
	}
	//
	//
	//
	let data = req.body;
	//
	//
	//
	let files = req.files;
	//
	//
	//
	let _DIR = cfg.server.upload.dir + data.patientID + '/';
    //
    //
    // 
    // NOTE: using the synchronous method is BLOCKING the main thread for the 
    //		 entire server application. This call is made once right here, and
   	//		 needs to be this way to ensure the directory exists before the next
   	//		 series of file operations.
    if(!Fs.existsSync(_DIR)){
    	//
    	//
    	//
    	Fs.mkdirSync(_DIR);
    }
    //
    //
    //
    let oldpath = null;
    let newpath = null;
    let file = null;
    let createdOn = null;
    let docs = [];
    //
    //
    //
    /*
		example file object inside the req.files array: 

		{
		    fieldname: 'uploads',
		    originalname: '7atoezktoh951.jpg',
		    encoding: '7bit',
		    mimetype: 'image/jpeg',
		    destination: '/tmp/',
		    filename: 'f7e9874e10e1a384e72f354adf1fb150',
		    path: '/tmp/f7e9874e10e1a384e72f354adf1fb150',
		    size: 76158
		},
	*/
    //
    //
    //
    for(let i = 0; i < files.length; i++){
    	//
    	//
    	//
    	file = files[i];
    	//
    	//
    	//
    	oldpath = file.path;
    	newpath = _DIR + file.originalname;
    	//
    	//
    	//
    	createdOn = Moment().unix();
    	//
    	//
    	//
    	docs.push({
    		createdBy: req.session.auth.uid,
    		createdOn: createdOn,
    		patientID: data.patientID,
    		breast: data.breast,
    		name: file.originalname,
    		path: newpath,
    		encoding: file.encoding,
    		mimetype: file.mimetype,
    		size: file.size,
    	});
    	//
    	//
    	// Move the file from temp upload dir to final location
    	Fs.rename(oldpath, newpath, function(err){ if(err) console.error('ERROR: API --> createRecord() --> (MOVING FILE) --> Fs.rename() --> err: ', err) });
    }
    //
    //
    //
    let Images = db.collection('images');
    //
    //
    //
    for(let i = 0; i < docs.length; i++){
    	//
    	//
    	//
    	Images.insert(docs[i], function(err, res){if(err){console.error('ERROR: uploadImage() err -->: ', err);}});
    }
    //
    //
    //
    res.send({
    	type: 'UPLOAD_IMAGE_RES',
    	payload: data.patientID,
    });
}
//
//
//
function deleteImage(req, res){
	//
	//
	// Auth Check
	if( req.session.auth.isAuthorized === false ){
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED'
		});
		//
		//
		//
		return res.end();
	}
	//
	//
	//
	let data = req.body;
	//
	//
	//
	if(data.patientID !== null && data.patientID !== '' && 
		data.imageID !== null && data.imageID !== ''){
		//
	    //
	    //
	    let Images = db.collection('images');
	    //
	    //
	    //
	    let query = {
	    	_id: new Mongodb.ObjectID(data.imageID),
	    	patientID: data.patientID,
	    };
	    //
	    //
	    //
	    Images.find(query, function(err, docs){
	    	//
	    	//
	    	//
	    	if(err){
	    		//
	    		//
	    		//
	    		console.error('ERROR: deleteImage() --> Images.find() --> err: ', err);
	    		//
	    		//
	    		//
	    		generic.sendError(res, 500, true);
	    		//
	    		//
	    		//
	    		res.end();
	    		//
	    		//
	    		//
	    		return;
	    	}
	    	else{
	    		//
	    		//
	    		//
	    		if(docs.length > 0){
	    			//
	    			//
	    			//
	    			let image = docs[i];
    				//
    				//
    				//
    				Fs.unlinkSync(image.path);
    				//
    				//
    				//
    				Images.remove(query, function(err){});
	    		}
	    		//
	    		//
	    		//
	    		res.send({
	    			type: 'DELETE_IMAGE_RES',
	    			payload: data.patientID,
	    		});
	    		//
	    		//
	    		//
	    		res.end();
	    	}
	    });
	}
	else{
		//
		//
		//
		generic.sendError(res, 500, true);
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function getTechniciansList(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		//
		let query = {acctType: 'technician'};
		//
		//
		//
		let Users = db.collection('users');
		//
		//
		//
		Users.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> getTechniciansList() --> Users.find() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
			}
			else{
				//
				//
				//
				res.send({
					type: 'GET_TECHNICIANS_LIST_RES',
					payload: {
						list: docs
					}
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function getPhysiciansList(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		//
		let query = {acctType: 'physician'};
		//
		//
		//
		let Users = db.collection('users');
		//
		//
		//
		Users.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> getPHysiciansList() --> Users.find() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
			}
			else{
				//
				//
				//
				res.send({
					type: 'GET_PHYSICIANS_LIST_RES',
					payload: {
						list: docs
					}
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function getResearchersList(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		//
		let query = {acctType: 'researcher'};
		//
		//
		//
		let Users = db.collection('users');
		//
		//
		//
		Users.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> getResearchersList() --> Users.find() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
			}
			else{
				//
				//
				//
				res.send({
					type: 'GET_RESEARCHERS_LIST_RES',
					payload: {
						list: docs
					}
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function getAdminsList(req, res){
	//
	//
	//
	if( req.session.auth.acctType === 'admin' && 
		req.session.auth.isAuthorized === true ){
		//
		//
		//
		let query = {acctType: 'admin'};
		//
		//
		//
		let Users = db.collection('users');
		//
		//
		//
		Users.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> getAdminsList() --> Users.find() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
			}
			else{
				//
				//
				//
				res.send({
					type: 'GET_ADMINS_LIST_RES',
					payload: {
						list: docs
					}
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function createUser(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true && req.session.auth.acctType === 'admin'){
		//
		//
		//
		let data = req.body;
		console.log('DEBUG: API --> createUser() --> req.body.payload: ', req.body);
		//
		//
		//
		try{
			//
			//
			//
			Bcrypt.hash(data.password, cfg.bcrypt.saltRounds, function(err, hash){
				//
				//
				//
				if(err){
					//
					//
					//
					console.error('ERROR: API --> createUser() --> Bcrypt.hash() --> error: ', err);
					//
					//
					//
					generic.sendError(res, 500, true);
					//
					//
					//
					return;
				}
				else{
					//
					//
					//
					let Users = db.collection('users');
					//
					//
					//
					let query = {username: data.username, email: data.email};
					//
					//
					//
					let update = {
						$set:{
							username: data.username,
							email: data.email,
							password: hash,
							acctType: data.usertype,
							status: 'active',
							langpref: 'en-us',
							timezone: 'unknown',
							useragent: req.useragent,
							ip: req.ip,
							location: Geoip.lookup(req.ip),
							createdBy: req.session.auth.uid,
							createdOn: Moment().unix(),
						}
					};
					//
					//
					//
					Users.update(query, update, {upsert: true}, function(err, doc){
						//
						//
						//
						if(err){
							//
							//
							//
							console.error('ERROR: API --> createUser() --> Users.update() --> err: ', err);
							//
							//
							//
							generic.sendError(res, 500, true);
							//
							//
							//
							return;
						}
						else{
							//
							//
							//
							res.send({
								type: 'CREATE_USER_RES',
								payload: {
									success: true,
									newUser: doc
								}
							});
						}
					});
				}
			});
		}
		catch(err){
			//
			//
			//
			console.error('ERROR: API --> createUser() --> exception: ', err);
			//
			//
			//
			generic.sendError(res, 500, true);
			//
			//
			//
			return;
		}
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function search(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		//
		let data = req.body;
		//console.log('DEBUG: API _-> search() --> query: ', req.body);
		//
		//
		// TEMPORARY QUERY: this search function will need to take keyword searches seriously
		let query = {};
		//
		//
		//
		if(data.age !== '')
			query['age'] = data.age;
		//
		//
		//
		if(data.gender !== '')
			query['gender'] = data.gender;
		//
		//
		//
		if(data.ethnicity !== '')
			query['ethnicity'] = data.ethnicity;
		//
		//
		//
		if(data.sampleDate !== '')
			query['sampleDate'] = data.sampleDate;
		//
		//
		//
		if(data.bloodType !== '')
			query['bloodType'] = data.bloodType;
		//
		//
		//
		if(data.bloodOxygen !== '')
			query['bloodOxygen'] = data.bloodOxygen;
		//
		//
		//
		if(data.bloodPressure !== '')
			query['bloodPressure'] = data.bloodPressure;
		//
		//
		//
		if(data.weight !== '')
			query['weight'] = data.weight;
		//
		//
		//
		if(data.patientID)
			query['_id'] = data.patientID;
		//
		//
		//
		let Records = db.collection('records');
		//
		//
		//
		Records.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> search() --> Records.find() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
				//
				//
				//
				return;
			}
			else{
				//
				//
				//
				res.send({
					type: 'SEARCH_RES',
					payload: docs,
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function getAll(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		// 
		let query = {};
		//
		//
		//
		let Records = db.collection('records');
		//
		//
		//
		Records.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> search() --> Records.getAll() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
				//
				//
				//
				return;
			}
			else{
				//
				//
				//
				res.send({
					type: 'FIND_ALL_RECORDS_RES',
					payload: docs,
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function getImages(req, res){
	//
	//
	//
	let data = req.body;
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		// 
		let query = {
			patientID: data.patientID,
		};
		//
		//
		//
		let Images = db.collection('images');
		//
		//
		//
		Images.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> search() --> Records.getAll() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
				//
				//
				//
				return;
			}
			else{
				//
				//
				//
				res.send({
					type: 'GET_PATIENT_IMAGES_RES',
					payload: docs,
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function getNotes(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized == true){
		//
		//
		//
		let MRN = req.body.MRN;
		//
		//
		//
		let query = {
			MRN: MRN,
		};
		//
		//
		//
		let Notes = db.collection('notes');
		//
		//
		//
		Notes.find(query, function(err, docs){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> getNotes() --> Notes.find() --> error: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
				//
				//
				//
				return;
			}
			else{
				//
				// success
				//
				res.send({
					type: 'PHYSICIAN_GET_NOTES_RES',
					payload: docs 
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;

	}
}
//
//
//
function saveNote(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		//
		let data = req.body;
		console.log('DEBUG: api --> saveNote() --> data: ', data);
		//
		//
		//
		/*
		{
			mrn: this.props.patient.id (mrn)
			type: 'draft',
			text: this.state.noteTextarea,
		}
		*/
		//
		//
		//
		let note = {
			createdByUID: req.session.auth.uid,
			createdByType: req.session.auth.acctType,
			createdByUser: req.session.auth.username,
			createdOn: Moment().unix(),
			MRN: data.MRN,
			type: data.type, //['draft', 'published', 'discarded']
			text: data.text,
		};
		//
		//
		//
		let Notes = db.collection('notes');
		//
		//
		//
		Notes.insert(note, function(err, doc){
			//
			//
			//
			if(err){
				//
				//
				//
				console.error('ERROR: API --> saveNote() --> Notes.insert() --> err: ', err);
				//
				//
				//
				generic.sendError(res, 500, true);
				//
				//
				//
				return;
			}
			else{
				//
				// success
				//
				res.send({
					type: 'PHYSICIAN_SAVE_NOTE_RES',
					payload: doc
				});
			}
		});
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
//
function publishNote(req, res){
	//
	//
	//
	if(req.session.auth.isAuthorized === true){
		//
		//
		//
		let data = req.body;
		//
		//
		//
		/*
			example note:
			{
				operation: '', // [update, insert]	
				draftID: '', // mongodb objectID -- only present on drafts
				MRN: '',
				type: '', // [draft, published, discarded]
				text: '',
			}
		*/
		//
		//
		//
		if(data.operation == 'update'){
			//
			//
			//
			let query = {
				MRN: data.MRN,
				_id: data.draftID
			};
			//
			//
			//
			let update = {
				$set:{
					type: data.type,
					text: data.text,				
				}
			};
			//
			//
			//
			let Notes = db.collection('notes');
			//
			//
			//
			Notes.update(query, update, function(err, doc){
				//
				//
				//
				if(err){
					//
					//
					//
					console.error('ERROR: API --> saveNote() --> Notes.insert() --> err: ', err);
					//
					//
					//
					generic.sendError(res, 500, true);
					//
					//
					//
					return;
				}
				else{
					//
					// success
					//
					res.send({
						type: 'PHYSICIAN_PUBLISH_NOTE_RES',
						payload: doc
					});
				}
			});
		}
		else{
			//
			// new published record, instead of updating, do insert
			//
			let note = {
				createdByUID: req.session.auth.uid,
				createdByType: req.session.auth.acctType,
				createdByUser: req.session.auth.username,
				createdOn: Moment().unix(),
				MRN: data.MRN,
				type: data.type, //['draft', 'published', 'discarded']
				text: data.text,
			};
			//
			//
			//
			let Notes = db.collection('notes');
			//
			//
			//
			Notes.insert(note, function(err, doc){
				//
				//
				//
				if(err){
					//
					//
					//
					console.error('ERROR: API --> saveNote() --> Notes.insert() --> err: ', err);
					//
					//
					//
					generic.sendError(res, 500, true);
					//
					//
					//
					return;
				}
				else{
					//
					// success
					//
					res.send({
						type: 'PHYSICIAN_PUBLISH_NOTE_RES',
						payload: doc
					});
				}
			});
		}
	}
	else{
		//
		//
		//
		res.send({
			type: 'NOT_AUTHORIZED',
		});
		//
		//
		//
		res.end();
		//
		//
		//
		return;
	}
}
//
//
// 
let _api = {
	account: {
		resetPass: resetPass,
	},
	auth:{
		isAuthorized: isAuthorized,
		login: login,
		logout: logout,
	},
	records:{
		create: createRecord,
		delete: deleteRecord,
		upload_image: uploadImage,
		delete_image: deleteImage,
		search: search,
		get_all: getAll,
		get_images: getImages,
		get_notes: getNotes,
		save_note: saveNote,
		publish_note: publishNote,
	},
	admin: {
		create_user: createUser,
		get_technicians_list: getTechniciansList,
		get_physicians_list: getPhysiciansList,
		get_researchers_list: getResearchersList,
		get_admins_list: getAdminsList,
	},
};

module.exports = _api;