//
//
//
// First Run Setup Script: Allows creation of admin account from the node CLI
//
//
// Node Module Requirements
const Fs = require('fs');
const Process = require('process');
//
//
// NPM Module Requirements
const Prompt = require('prompt-sync')();
const Bcrypt = require('bcrypt');
const Moment = require('moment');
//
//
// Custom Module Requirements
const cfg = require('./custom_modules/cfg');
const db = require('./custom_modules/db');
//
//
// Gather input
console.log('');
console.log('Welcome to the Setup-Physician-Account Utility!');
console.log('');
let email = Prompt('Email: ');
let username = Prompt('Username: ');
let password = Prompt('Password: ');
//
//
//
console.log('');
console.log(' ... working ...');

//
//
//
if( email !== '' && 
	email !== null &&
	username !== '' && 
	username !== null &&
	password !== '' && 
	password !== null ){
	//
	//
	//
	Bcrypt.hash(password, cfg.bcrypt.saltRounds, function(err, hash) {
		//
		//
		//
		if(err){
			//
			//
			//
			console.error('ERROR: Bcrypt hashing error: ', err);
			Process.exit(1);
		}
		else{
			//
			//
			//
			console.log('');
			console.log('User password successfully hashed!');
			//
			//
			//
			let Users = db.collection('users');
			//
			//
			//
			let query = {
				email: email,
			}; 
			//
			//
			//
			let user = {
				email: email,
				password: hash,
				username: username,
				acctType: 'physician',
				status: 'active',
				langpref: 'en-us',
				timezone: 'unknown',
				useragent: '',
				ip: '',
				location: '',
				createdBy: '-1',
				createdOn: Moment().unix(),
			};
			//
			//
			//
			Users.update(query, {$set: user}, {upsert: true}, function(err, doc){
				//
				//
				//
				if(err){
					//
					//
					//
					console.error('WARNING: New Physician NOT created!!!');
					console.error('ERROR: Users.insert() --> error: ', err);
					Process.exit(1);
				}
				else{
					//
					//
					//
					if(doc.n === 1 && doc.nModified === 0 ){
						//
						//
						//
						console.log('');
						console.log('New Physician account successfully created!');
					}
					else if(doc.n === 1 && doc.nModified === 1){
						//
						//
						//
						console.log('');
						console.log('Existing admin account successfully updated!');
					}
					else{
						//
						//
						//
						console.log('');
						console.log('WARNING: New Admin NOT created!!!');
						console.log('WARNING: Database returned unsuccessful result: ', doc);
					}
					//
					//
					//
					console.log('');
					Process.exit(0);
				}
			});
		}
	});
}
else{
	//
	//
	//
	console.log('');
	console.log("ERROR: New admin account NOT created!!! Missing required input!");
	//
	//
	//
	if(email === null || email === ''){
		console.log(' - Invalid email: ', email.toString());
	}
	//
	//
	//
	if(username === null || username === ''){
		console.log(' - Invalid username: ', username.toString());
	}
	//
	//
	//
	if(password === null || password === ''){
		console.log(' - Invalid password: ', password.toString());
	}
	//
	//
	//
	console.log('');
	Process.exit(1);
}