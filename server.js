//
//
// SERVER.JS
//
//
// Node Dependencies
let Fs = require('fs');
let Https = require('https');
//
//
// NPM Dependencies
let Helmet = require('helmet');
let Multer = require('multer');
let Express = require('express');
let BodyParser = require('body-parser');
let Session = require('express-session');
let UserAgent = require('express-useragent');
let MongoDBStore = require('connect-mongodb-session')(Session);
//
//
// Custom Dependencies
let cfg = require('./custom_modules/cfg/');
let api = require('./custom_modules/api/');
let db = require('./custom_modules/db');
//
//
// Initialize the application
let app = Express();
let upload = Multer(cfg.multer.options)
//
//
// Configure Express App
app.use(Helmet()); // defend against basic attacks
app.use('/', Express.static('./public')); // statically serve the ./public directory as webroot
console.warn('WARNING: server.js --> ./uploads is statically served!! It needs to be secured before deployment!!');
app.use('/uploads', Express.static('./uploads')); // DANGER: this is setup this way for development, NOT SECURE FOR PRODUCTION!!
app.use(BodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(BodyParser.json()); // parse application/json
app.use(UserAgent.express()); // connect user-agent middleware to express app (ex: req.useragent)
//
//
// Session Management Configuration
let store = new MongoDBStore({
  uri: cfg.db.connstr,
  collection: cfg.db.session_collection_name
});
//
//
// Catch session store errors
store.on('error', cfg.session.storeErr); //NOTE: failure to connect to the DB on startup will throw an error!!
//
//
//
app.use(Session({
  store: store,
  secret: cfg.session.secret,
  cookie: cfg.session.cookie,
  resave: cfg.session.resave,
  saveUninitialized: cfg.session.saveUninitialized
}));
//
//
// =============
// PUBLIC ROUTES
// =============
//
//
app.route('/login').post(api.auth.login);
app.route('/isauthorized').post(api.auth.isAuthorized);
app.route('/resetpass').post(api.account.resetPass);
//
//
// ================
// PROTECTED ROUTES
// ================
//
//
app.route('/logout').post(api.auth.logout);
app.route('/records/create').post(api.records.create);
app.route('/records/delete').post(api.records.delete);
app.route('/records/image/upload').put(upload.array('uploads', cfg.multer.options.limits.files), api.records.upload_image);
app.route('/records/delete/image').post(api.records.delete_image);
app.route('/records/search').post(api.records.search);
app.route('/records/get/all').post(api.records.get_all);
app.route('/records/get/images').post(api.records.get_images);
app.route('/records/get/notes').post(api.records.get_notes);
app.route('/records/save/note').post(api.records.save_note);
app.route('/records/publish/note').post(api.records.publish_note);
app.route('/users/create').post(api.admin.create_user);
app.route('/users/get/technicians').get(api.admin.get_technicians_list);
app.route('/users/get/physicians').get(api.admin.get_physicians_list);
app.route('/users/get/researchers').get(api.admin.get_researchers_list);
app.route('/users/get/admins').get(api.admin.get_admins_list);
//
//
// ===================
// HTTPS SERVER CONFIG
// ===================
//
//
let keypath = cfg.mode === 'dev' ? cfg.server.dev.key : cfg.server.prod.key;
let certpath = cfg.mode === 'dev' ? cfg.server.dev.cert : cfg.server.prod.cert;
let privateKey  = Fs.readFileSync(keypath, 'utf8').toString();
let certificate = Fs.readFileSync(certpath, 'utf8').toString();
//
//
//
let crendentials = null;
if(cfg.mode === 'dev'){
	//
	//
	//
	credentials = {key: privateKey, cert: certificate};
}
else{
	//
	// Godaddy sends their Certificate Authority certs as a bundle
	// Node.js likes it if you break out each cert and add them individually
	let ca1path = cfg.server.prod.ca1;
	let ca2path = cfg.server.prod.ca2;
	let ca3path = cfg.server.prod.ca3;
	//
	// The Godaddy bundle cert was cut into 3 tidy pieces each named gdX.crt
	//
	let ca1 = Fs.readFileSync(ca1path, 'utf8').toString();
	let ca2 = Fs.readFileSync(ca2path, 'utf8').toString();
	let ca3 = Fs.readFileSync(ca3path, 'utf8').toString();
	//
	//
	//
	credentials = {key: privateKey, cert: certificate, ca: [ca1, ca2, ca3]};
}
//
//
//
let httpsServer = Https.createServer(credentials, app);
//
//
// ================
// Start the server
// ================
//
//
let port = cfg.mode === 'dev' ? cfg.server.dev.port : cfg.server.prod.port;
httpsServer.listen(port, ()=>{console.log('Server started on port: ' + port)});