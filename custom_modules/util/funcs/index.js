//
//
//
// Collection of useful functions
//
//
//
const Fs = require('fs');
//
//
//
function move_tmp_uploads(files){
	//
	//
	//
	console.log('DEBUG: util/funcs --> move_uploads() --> files input: ', files);
	//
	//
	//
	if( typeof files !== 'undefined' && 
		files !== null && 
		files.length > 0){
		//
		//
		//
		for(let i = 0; i < files.length; i++){
			//
			//
			//
			Fs.renameSync();
		}
	}
	else{
		//
		//
		//
		console.log('NOTICE: util/funcs --> move_uploads() was passed an invalid files object');
		return;
	}
}
//
//
//
function clean_hash(_hash){
	//
	//
	// by removing the preceeding rounds and salt, it adds one more little layer of protection
	//console.log('DEBUG: util/funcs --> cleanHash() --> hash.pop() --> hash (before): ', _hash);
	//
	//
	// Split the string on the dollar signs
	// ex: $2b$15$OaxYRvyuWpQpCPTjNcQb/OrquHLVYVr2Ab8ReUrQtMrQZYIyhairm
	let hash = _hash.split('$');
	//
	//
	// Slice the first 3 elements of the front of the array
	// ex: OaxYRvyuWpQpCPTjNcQb/OrquHLVYVr2Ab8ReUrQtMrQZYIyhairm
	let hash1 = hash.slice(3);
	//
	//
	// Just in case it it still an array, join
	hash = hash1.join('');
	//
	//
	// Since this value will be used as a directory name for file uploads
	// loop over the string and replace all forward slashes with periods
	// ex: OaxYRvyuWpQpCPTjNcQb.OrquHLVYVr2Ab8ReUrQtMrQZYIyhairm
	while(hash.indexOf('/') !== -1){
		//
		//
		//
		hash = hash.replace('/', '.');
	}
	//
	//
	//
	//console.log('DEBUG: util/funcs --> cleanHash() --> hash.pop() --> hash: (after): ', hash);
	//
	//
	//
	return hash;
}
//
//
//
module.exports = {
	moveUploads: move_tmp_uploads,
	cleanHash: clean_hash,

};