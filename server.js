var express = require('express');
var ejs = require('ejs');
var app = express(); 
var analyze = require('sentimental').analyze;

var Twitter = require('ntwitter');

var twitter = new Twitter({
  consumer_key: 'HYPKYRKgOXzVrtUij1xUZw',
  consumer_secret: 'HYPKYRKgOXzVrtUij1xUZw',
  access_token_key: '341830940-xpWrMI7r1KzNOsFAlIUHmnPm7j1Bpu56803v026c',
  access_token_secret: 'u7dZuEyXyoWOWQ7LsWzVAzeMpDkVyRhBx426yHTz3LlXb'
});

// handle posts in express
app.use(express.bodyParser());

// use root '/' to access public files folder ie '/index.html'
//app.use('/', express.static(__dirname + '/public'));

// use Embedded Javascript templating
//app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
    
     var model = {
                    "name":"placeholder"
                }
    
    res.render('index.ejs', model);   
    
});

// handles form post
/*app.post('/formPost', function(req, res){
	//console.log(req.body);
	 /*
	 { 
	 email: 'email@champlain.edu',
	  hashtags: '#CampChamp',
	  apiToUse: 'facebook',
	  numResults: '3',
	  location: [ 'eu', 'am', 'sa' ],
	  dateOfContent: '2013-10-11',
	  area: 'This\r\nis\r\nso\r\nmulti-\r\nline!' 
	  }
	*/
	//var model = "meep";//req.body;
	 
	 
	 //Sentimental
	 //model.sentimentScore = analyze(model.area).score;
	 
	 //console.log("model:");
	//console.log(model);
	
	// Renders EJS file
	/*res.render('index.ejs', model);
	res.end();
});
*/
app.listen(3000);