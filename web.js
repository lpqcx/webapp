var express = require('express');
var fs = require('fs');
var app = express.createServer(express.logger());
var redis = require("redis"),
        client = redis.createClient();

app.use('/assets/img',express.static(__dirname + '/assets/img'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/fonts',express.static(__dirname + '/fonts'));

app.use(express.bodyParser());

var buf = fs.readFileSync('index.html');

var users = [
		{'email':'lpq1990@gmail.com','password':'MIsa-901357','id':'0'},
		{'email':'chenxilisa@gmail.com','password':'MIsa-901357','id':'1'}
]

app.get('/', function(request, response) {
	response.send(buf.toString());
});

app.post('/wedding', function(request, response) {
	var post = request.body;
	if(post.vCode === '77xixi100'){
		response.json({ isValid: true });
	}
	else{
		response.json({ isValid: false });
	}
});

app.get('/wedding', function(request, response) {
	var wedding = fs.readFileSync('wedding.html');
	response.send(wedding.toString());
});

app.post('/login', function(req,res){
	var post = req.body;
	for (user in users){  
		if(post.email == user.email && post.password == user.password){
			req.session.user_id = user.id;
			req.send('Login Successful!');
		}
	}
	res.send('Login Failed!');  
});

app.post('/bless', function(req,res){
	var post = req.body;
	client.on("error", function (err) {
    console.log("Error " + err);
  });
  var name = post.name;
  var text = post.text;
  var isExist = false;
  client.hget(["bless", name], function(err, reply) {
    if(reply){
    	res.json({isValid: false, result: null});
    }
    else{
    	console.log('fuck');
    	client.hset("bless", name, text, redis.print);
			client.hgetall("bless", function (err, obj) {
				console.dir(obj);
			  res.json({isValid: true, result: obj});
			  //client.end();
			});
    }
  });
});

app.post('/showbless', function(request, response) {
	client.on("error", function (err) {
    console.log("Error " + err);
  });
	client.hgetall("bless", function (err, obj) {
		console.log('fuck');
		console.dir(obj);
	  response.json(obj);
	  //client.end();
	});
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
	console.log("Listening on " + port);
});
