// Node Module
var express = require('express'),
	app = express();

// Config
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Route
app.get('/', function(req, res) {
	res.render('index');
});

app.get('/transfer', function(req, res) {
	res.render('transfer');
});

// app.get('/', function(req, res) {
// 	res.render('index');
// });

// Server
app.listen(process.env.PORT || 4000, process.env.IP, function() {
	console.log('Server Running at Port 4000');
});
