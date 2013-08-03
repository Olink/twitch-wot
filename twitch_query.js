var https = require('https');
var streamers = {};

var options = {
		hostname: "api.twitch.tv",
		path: "/kraken/search/streams?query=World%20of%20Tanks&limit=50",
		headers: {'Content-Type': 'application/vnd.twitchtv.v3+json'}
};

function make_req(options, callback) {
	var data = "";
	https.get(options, function(res){
		res.setEncoding('utf8');
		res.on('data', function (chunk) {
			data += chunk.toString("utf8");
		});
		
		res.on('error', function(e) {
			console.log('problem with request: ' + e.message);
		});
		
		res.on('end', function(){
			var json_obj = JSON.parse(data);			
			pretty_print(json_obj);
			callback(streamers);
		});
	});
}

function pretty_print(json_obj) {
	for(var key in json_obj.streams) {
		if(json_obj.streams[key].game.toLowerCase() != 'world of tanks') {
			continue;
		}
		
		var name = json_obj.streams[key].channel.name;
		streamers[name] = {};
		streamers[name].name = name;
		streamers[name].game = json_obj.streams[key].game;
		streamers[name].viewers = json_obj.streams[key].viewers;
		streamers[name].url = json_obj.streams[key].channel.url;
		streamers[name].title = json_obj.streams[key].channel.status;
	}
}

twitch_query.prototype.get_streamers = function(callback) {
	make_req(options, callback);
};
	
function twitch_query() {
}

module.exports = twitch_query;
