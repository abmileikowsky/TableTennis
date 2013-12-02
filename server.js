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
			name: ['','','','','','','','','',''],
			picture: ['','','','','','','','','',''],
			text: ['','','','','','','','','',''],
			sentiment: [0,0,0,0,0,0,0,0,0,0]
	} 
	
	res.render('index.ejs',model);
    
});


// handles form post

app.post('/formPost', function(req, res){
	//console.log(req.body);
	
	var model = {
				name: [],
				picture: [],
				text: [],
				sentiment: []
			}
	
	if(req.body.source == "twitter")
		{
		twitter.get('search/tweets', {q: req.body.hashtag1}, function(err, item) {
			
			var i = 0
			for(; i<item.statuses.length && i<10;i++)
			{
				model.name[i] = item.statuses[i].user.name;
				model.picture[i] = item.statuses[i].user.profile_image_url;
				model.text[i] = item.statuses[i].text;
				model.sentiment[i] = analyze(model.text[i]).score;
			}
			
			for(; i<10;i++)
			{
				model.name[i] = '';
				model.picture[i] = '';
				model.text[i] = '';
				model.sentiment[i] = 0;
			}
			
			res.render('index.ejs', model);
		
		});
	}
	else if(req.body.source == "instagram")
	{
		//INSTAGRAM SEARCH CODE HERE//
	}
	
	
});


var port = process.env.PORT || 5000;
app.listen(port);