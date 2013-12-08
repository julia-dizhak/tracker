function(doc){
	if('message' in doc){
		emit(null, doc);
	}
}