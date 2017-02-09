function route(hander,url,respon,pordata){
	if(typeof hander[url] == "function"){
		hander[url](respon,pordata);
	}
	else{
		console.log("error");
	}
}

exports.route = route;