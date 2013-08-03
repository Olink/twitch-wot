//curl -H 'Accept: application/vnd.twitchtv.v3+json' \
//-X GET https://api.twitch.tv/kraken/search/streams?q=starcraft

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
			callback(json_obj);
		});
	});
}

function pretty_print(json_obj) {
	console.log(json_obj._links.self);
	for(var key in json_obj.streams) {
		//console.log(json_obj['streams'][key]);
		if(json_obj.streams[key].game.toLowerCase() != 'world of tanks') {
			continue;
		}
		
		streamers[json_obj.streams[key].channel.name] = {};
		streamers[json_obj.streams[key].channel.name].viewers = json_obj.streams[key].viewers;
		streamers[json_obj.streams[key].channel.name].url = json_obj.streams[key].channel.url;
		streamers[json_obj.streams[key].channel.name].title = json_obj.streams[key].channel.status;
		
		console.log(json_obj.streams[key].channel.name + " is playing " +
								json_obj.streams[key].game + " with " + 
								json_obj.streams[key].viewers + " viewers.");
	}
}

var data = "";
make_req(options, function(json_obj) {
	for(var key in json_obj.streams) {
		if(json_obj.streams[key].game.toLowerCase() != 'world of tanks') {
			continue;
		}
		
		console.log(json_obj.streams[key]);
	}
});
