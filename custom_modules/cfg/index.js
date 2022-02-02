//
//
// Server Config Module 
//
//
/*
	Localhost MongoDB credentials

	Instructions pulled from this thread: 
	https://dba.stackexchange.com/questions/160152/mongodb-allow-access-only-from-local-server


	use admin
	db.createUser(
	  {
	    user: "root",
	    pwd: "xLkQjcWtQZX3rS2",
	    roles: [ { role: "root", db: "admin" } ]
	  }
	)

	use NISTADB
	db.createUser(
	  {
	    user: "NISTAsystem",
	    pwd: "kdsexpoIufd3W09awe",
	    roles: [ { role: "readWrite", db: "NISTADB" } ]
	  }
	)
*/
/*
freemium Mongodb.com account values
-----------------------------------
MongoDB.com account login details:
email: bcda.dev.1@gmail.com
passw: freecats
Programmatic login details:
const username = "dev-system"; // application db user name
const password = "xLkQjcWtQZX3rS2"; // application db user password
const dbname = "alpha_DB_1"; // application main db name
*/
//
//
//
const username = 'NISTAsystem';
const password = 'kdsexpoIufd3W09awe';
const dbname = 'NISTADB';
//
//
//
let temp = {
	mode: 'prod',
};
//
//
// Server Configuration Object
let _cfg = {
	mode: 'dev',
	global: {

	},
	server: {
		dev: {
			port: 8443,
			cert: './sslcert/dev/self-signed.crt',
			key: './sslcert/dev/self-signed.key',
		},
		prod: {
			port: 443,
			cert: './sslcert/prod/cffb1e90e9f04804.crt',
			key: './sslcert/prod/server.key',
			ca1: './sslcert/prod/gd1.crt',
			ca2: './sslcert/prod/gd2.crt',
			ca3: './sslcert/prod/gd3.crt',
		},
		upload:{
			dir: './uploads/',
		},
	},
	db:{
		/*connstr: `mongodb+srv://${username}:${password}@dev-bcda.uzgxg.mongodb.net/${dbname}?retryWrites=true&w=majority`,//`mongodb+srv://${username}:${password}@internationaldatingclus.zei8c.mongodb.net/${dbname}?retryWrites=true&w=majority`,*/
		connstr: `mongodb://${username}:${password}@localhost:27017/${dbname}?authSource=${dbname}`,
		session_collection_name: 'sessions'
	},
	session:{
		storeErr: function(error) {
		  	console.error('ERROR: Session Store encountered an error: ', error);
		},
		cookie: {
    		maxAge: 1000 * 60 * 60 * 24, // 24 hours / 1 day
    		secure: true,
  		},
		secret: 'ihugfbyeunuhasuvyfdnfawbhfergseruauhereygrhaeuyrgvu6gywefhrgyhwdfgetgyVWQygfwtczxgsytger',
		resave: false,
		saveUninitialized: false,
	},
	bcrypt:{
		saltRounds: 15, // range of 9 - 15, 9 is quicker, 15 is slower
	},
	multer:{
		options:{
			dest: '/tmp/', //temporary upload destination for staging files
			fileFilter: function fileFilter (req, file, cb) {
 
				// The function should call `cb` with a boolean
				// to indicate if the file should be accepted

				// To reject this file pass `false`, like so:
				//cb(null, false)

				// To accept the file pass `true`, like so:
				cb(null, true);

				// You can always pass an error if something goes wrong:
				//cb(new Error('I don\'t have a clue!'))
			 
			},
			limits: {
				fieldNameSize: 100,	// Max field name size	100 bytes
				fieldSize: 1024 * 4, // Max field value size (in bytes)	4Kb
				fields: 20, // Max number of non-file fields	Infinity
				fileSize: 1024 * 1024 * 10, // For multipart forms, the max file size (in bytes)	10Mb
				files: 25, // For multipart forms, the max number of file fields	Infinity
				//parts: 15, // For multipart forms, the max number of parts (fields + files)	Infinity
				//headerPairs	For multipart forms, the max number of header key=>value pairs to parse
			},
			preservePath: true, // Keep the full path of files instead of just the base name
		},
	},
	app:{},
};
//
//
//
module.exports = _cfg;