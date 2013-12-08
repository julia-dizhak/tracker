function(head, request){
	provides('json', function() {
		var row; 
		var results = [];
		while(row = getRow()) {
			if(row.value.userName == request.userCtx.name){
				results.push(row.value)
			}
		} 
		send(JSON.stringify(results))
	});
}