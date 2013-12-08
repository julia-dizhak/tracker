function(newDoc, oldDoc, userCtx, secObj){
	if('message' in newDoc && newDoc.userName != userCtx.name){
		throw({forbidden: 'This is not yours!'});
	}
}