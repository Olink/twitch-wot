var express = require('express');
var app = express();

var cons = require('consolidate');
var swig = require('swig');

var path = require('path')

var twitch_query = require('./twitch_query');

app.engine('.html', cons.swig);
app.set('view engine', 'html');

// NOTE: Swig requires some extra setup
// This helps it know where to look for includes and parent templates
swig.init({
  root: './templates/',
  allowErrors: true, // allows errors to be thrown and caught by express instead of suppressed by Swig
  cache: false //Turn off caching for nodejs
});
app.set('views', './templates/');

app.use(express.cookieParser());
app.use(express.session({secret:'thisisoursecret'}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	var tq = new twitch_query();
	tq.get_streamers(function(json_obj){
		res.render('test.html', {streamers : json_obj});
	});
	
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
