var express = require('express');
var ejs = require('ejs');
var app = express(); 
var analyze = require('sentimental').analyze;

var Twitter = require('mtwitter');

var twitter = new Twitter({
  consumer_key: 'HYPKYRKgOXzVrtUij1xUZw',
  consumer_secret: 't9Hfwl2CYFandfwxHyrP4SYPEmQCaj8pUTh91f8Rqs',
  access_token_key: '341830940-xpWrMI7r1KzNOsFAlIUHmnPm7j1Bpu56803v026c',
  access_token_secret: 'u7dZuEyXyoWOWQ7LsWzVAzeMpDkVyRhBx426yHTz3LlXb'
});



 
/*twitter.get('search/tweets', {q: 'yolo'}, function(err, item) {
  console.log(err, item);
});*/

;

// handle posts in express
app.use(express.bodyParser());

// use root '/' to access public files folder ie '/index.html'
//app.use('/', express.static(__dirname + '/public'));

// use Embedded Javascript templating
//app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
    
     var model = {
			text: ['d','d']
	} 
	
	res.render('index.ejs',model);
    
});


// handles form post

app.post('/formPost', function(req, res){
	//console.log(req.body);
	
	
	
	twitter.get('search/tweets', {q: req.body.hashtag1}, function(err, item) {
		
		var model = {
			text: []
		}
		
		
		
		for(var i=0; i<item.statuses.length;i++)
		{
			model.text[i] = item.statuses[i].text;
			console.log(item.statuses[i].text);
			console.log(" ");
		}
		
		res.render('index.ejs', model);
	
	});
	
	
});



app.listen(3000);	