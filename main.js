var express = require('express');
var app = express();

var cons = require('consolidate');
var swig = require('swig');

var path = require('path')

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
	res.render('test.html');
});

console.log("Starting server on *:62378");
app.listen(7778);
