//
//
// DB index.js
//
//
// Required NPM Modules
const MongoJS = require('mongojs');
//
//
// Required Custom Modules
const cfg = require('../cfg');
//
//
//
/*
	Example
	---------
	From the NPM MongoJS page: 

	// connect now, and worry about collections later
	const db = mongojs('mydb')
	const mycollection = db.collection('mycollection')

*/
//
//
//
let db = null;
//
//
//
if(db === null){
	db = MongoJS(cfg.db.connstr);
}
//
//
//
module.exports = db;