let apiKey = '859dd915fbeed6d12c75e1ad595bf2ae'; // key you get from the website 
let city = 'new york'; // tyoe in your current place
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}` //do not change this, this is the like to the API 

var express = require('express'); //need to get API using node 
var app = express(); //need to get API using node
//set up to connect to localhost 
var server = require('http').createServer(app); 
var io = require('socket.io')(server);
var port = process.env.PORT || 8080; //this number and the number on your chrome need to be same

//setting up serial port to connect arduino 
var SerialPort = require('serialport');
var serialVal;

let message;
var mySerialPort = new SerialPort('/dev/tty.usbmodem1411', { //paste your port path here
  parser: new SerialPort.parsers.Readline('\n') //this set up what Arduino side will do
});

//getting weather from API!!!
const request = require('request'); //this is node function
request(url, function (err, response, body) { //seding the request to get weather 
//to not crush program with errors, if program sees error, it tell us and will stop doing rest of things
  if(err){
    console.log('error:', error);
  } 
  //if there is no error
  else {
    let weather = JSON.parse(body); //getting whole data out of weather API
    message = `${weather.weather[0].main}, ${weather.main.temp} degrees in ${weather.name}!`; //creating message that will be shown on LCD
   	console.log(message); //just printing out so we can see what is been sent 
  }
});

//when it's connected to localhot...
server.listen(port, function(){
	console.log('Server listening on ' + port);
});

//when you click the mouse...
io.on('connection',function(client){
	//letting you know that you open the localhost
	console.log('Socket connected...');
	
  	client.emit('initialMessage');

  		client.on('0', function(){
  			console.log("mouse up");
  			//sending message to the Arduino 
  			mySerialPort.write(message);
	 		

		});

		client.on('1', function(){
			console.log("mouse down");

		});

	});




app.get('/', function(req,res){
	console.log('serving index.html');
	res.sendFile(__dirname + '/digitalWrite.html');

});

