var express = require('express');
var ejs = require('ejs');
var app = express(); 
var analyze = require('sentimental').analyze;
var Instagram = require('instagram-node-lib');
var Twitter = require('mtwitter');

var twitter = new Twitter({
  consumer_key: 'HYPKYRKgOXzVrtUij1xUZw',
  consumer_secret: 't9Hfwl2CYFandfwxHyrP4SYPEmQCaj8pUTh91f8Rqs',
  access_token_key: '341830940-xpWrMI7r1KzNOsFAlIUHmnPm7j1Bpu56803v026c',
  access_token_secret: 'u7dZuEyXyoWOWQ7LsWzVAzeMpDkVyRhBx426yHTz3LlXb'
});


Instagram.set('client_id', '371053453f2b4f349e542db37e42a420');
Instagram.set('client_secret', '5f7678cb2c00403eb72d37d5dbcc81fa');


 
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
	
	
	
	if(req.body.source == "twitter")
		{
		twitter.get('search/tweets', {q: req.body.hashtag1}, function(err, item) {
			
			var i = 0
			var model = {
				name: [],
				picture: [],
				text: [],
				sentiment: []
			}
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
		Instagram.tags.recent({ name: req.body.hashtag1, complete: function(data, pagination ) 
        {
			var i = 0
			var model = {
				name: [],
				profPic: [],
				picture: [],
				text: [],
				sentiment: []
			}
			for(; i<data.length && i<10;i++)
			{
				model.name[i] = data[i].user.username;
				model.text[i] = data[i].caption.text;
				model.profPic[i] = data[i].user.profile_picture;
				model.picture[i] = data[i].images.standard_resolution.url;
				model.sentiment[i] = analyze(model.text[i]).score;
				
			}
			/*var i = 0
			var model = {
				name: [],
				profPic: [],
				picture: [],
				text: [],
				sentiment: []
				}
				for(; i<data.length && i<10;i++)
				{
					model.name[i] = data[i].user.username;
					model.profPic[i] = data[i].user.profile_picture;
					model.text[i] = data[i].caption;
					model.picture[i] = data[i].images.standard_resolution.url;
					model.sentiment[i] = analyze(model.text[i]).score;
				}
				
				for(; i<10;i++)
				{
					model.name[i] = '';
					model.picture[i] = '';
					model.profPic[i] = '';
					model.text[i] = '';
					model.sentiment[i] = 0;
				}
			
			res.render('index2.ejs', model);*/
			
			res.render('index2.ejs', model);
                                
        }
    });   
		/*var i = 0
		var model = {
				name: [],
				profPic: [],
				picture: [],
				text: [],
				sentiment: []
			}
			for(; i<item.statuses.length && i<10;i++)
			{
				model.name[i] = item.data[i].user.username;
				model.profPic[i] = item.data[i].user.profile_picture;
				model.text[i] = item.data[i].caption;
				model.picture[i] = item.data[i].images.standard_resolution.url;
				model.sentiment[i] = analyze(model.text[i]).score;
			}
			
			for(; i<10;i++)
			{
				model.name[i] = '';
				model.picture[i] = '';
				model.profPic[i] = '';
				model.text[i] = '';
				model.sentiment[i] = 0;
			}
			
			res.render('index2.ejs', model);*/
	}
	
	
});


var port = process.env.PORT || 5000;
app.listen(port);