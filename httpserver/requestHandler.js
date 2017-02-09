var querystring = require("querystring");
var exec = require("child_process").exec;
function upload(respon,pordata){
	respon.writeHead(200, {"Content-Type": "text/plain"});
	var type = typeof pordata;
	console.log(querystring.parse(pordata));
	respon.write(querystring.parse(pordata));

			respon.end();
	console.log("upload");
}
function start(respon,pordata){
	console.log("start1");
	var content = "empty";
	
	// exec("find /"
	// 	,{timeout:10000,maxBuffer:20000*1024}
	// 	,function(error,stdout,stderr){
	// 		content = stdout;
	// 		respon.writeHead(200, {"Content-Type": "text/plain"});
	// 		respon.write("1234");
	// 		respon.end();
	// 	})

	var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
    respon.writeHead(200, {"Content-Type": "text/html"});
			respon.write(body);
			respon.end();
	console.log(content);
}

exports.upload = upload;
exports.start = start;