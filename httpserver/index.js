var service = require("./server.js");
var route = require("./route.js");
var requestHandler = require("./requestHandler.js");

var handle = [];
handle["/"] = requestHandler.start;
handle["/start"] = requestHandler.start;
handle["/upload"] = requestHandler.upload;
handle["/show"] = requestHandler.show;

service.start(route.route,handle);