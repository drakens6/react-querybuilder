exports.search = function(req,res){
	
    var queries = [];
    var querytext = "SELECT * FROM sometable WHERE ";
    if (req.body.type.constructor !== Array){
    	var query = {};
    	query.type = req.body.type
    	query.comparator = req.body.comparator
    	query.value1 = req.body.value1
    	if (query.comparator === 'LIKE' || query.comparator === 'NOT LIKE'){
    		query.value1 = "%" + query.value1 + "%"; 
    	}
    	query.value2 = req.body.value2;
    	if (query.value2 !== ''){
    		var newtext1 = '`' + query.type + '`' + ' ' + query.comparator + " '" + query.value1 + "' AND '" + query.value2 + "'";
    		querytext += newtext1;
    	}
    	else{
    		var newtext1 = '`' + query.type + '`' + ' ' + query.comparator + " '" + query.value1 + "'";
    		querytext += newtext1;
    	}
    }
    else {
		for (var i = 0; i < req.body.type.length; i++){
			var query = {};
			query.type = req.body.type[i];
			query.comparator = req.body.comparator[i];
			
			query.value1 = req.body.value1[i];
			if (query.comparator === 'LIKE' || query.comparator === 'NOT LIKE'){
				query.value1 = "%" + query.value1 + "%"; 
			}
			query.value2 = req.body.value2[i];
			if (i > 0){
				querytext += ' AND ';
			}
			if (query.value2 !== ''){
				var newtext1 = '`' + query.type + '`' + ' ' + query.comparator + " '" + query.value1 + "' AND '" + query.value2 + "'";
				querytext += newtext1;
			}
			else{
				var newtext1 = '`' + query.type + '`' + ' ' + query.comparator + " '" + query.value1 + "'";
				querytext += newtext1;
			}
		}
	}
    console.log(querytext)
    res.status(200).send(querytext)
}; 