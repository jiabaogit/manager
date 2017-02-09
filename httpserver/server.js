var http = require("http");
var url = require("url");

function start(route,handle){
	http.createServer(function(request,respon){
		var pathname = url.parse(request.url).pathname;
		var portData = '';
		/*接收数据*/
		request.addListener("data",function(pordataDuck){
			portData += pordataDuck;
			console.log("the post datachunk:"+pordataDuck);
		})
		/*接收数据完毕*/
		request.addListener("end",function(){
			console.log("接收完毕");
			route(handle,pathname,respon,portData);
		})

		console.log("request resived");
		// respon.writeHead(200,{"Content-Type":"text/plain"})
		// respon.write("hello world");
		// respon.end();
	}).listen(8888);
	console.log("start");
}
function write(){
	console.log("use module");
}

exports.start = start;
