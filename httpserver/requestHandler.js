var querystring = require("querystring");
var exec = require("child_process").exec;
var fs = require("fs");
function upload(respon,pordata){
	respon.writeHead(200, {"Content-Type": "text/plain"});
	var type = typeof pordata;
	console.log(querystring.parse(pordata));
	respon.write(querystring.parse(pordata).text);

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
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
    respon.writeHead(200, {"Content-Type": "text/html"});
			respon.write(body);
			respon.end();
	console.log(content);
}


function show(response, postData){
	fs.readFile("tmp/01.jpg", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {"Content-Type": "text/plain"});
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {"Content-Type": "image/*"});
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.upload = upload;
exports.start = start;
exports.show = show;