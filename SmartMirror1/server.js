let apiKey = '859dd915fbeed6d12c75e1ad595bf2ae';
let city = 'new york';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

//Lists Serialports available
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 8080;
var SerialPort = require('serialport');
var serialVal;
var temp;
let message;
var mySerialPort = new SerialPort('/dev/tty.usbmodem1411', { //paste your port path here
  parser: new SerialPort.parsers.Readline('\n')
});

const request = require('request');
request(url, function (err, response, body) {
  if(err){
    console.log('error:', error);
  } else {
    console.log('body:', body);
    let weather = JSON.parse(body);
    message = `${weather.weather[0].main}, ${weather.main.temp} degrees in ${weather.name}!`;
    temp = weather.main.temp;
    console.log(message);
    //mySerialPort.write(temp);
  }
});

server.listen(port, function(){
	console.log('Server listening on ' + port);
	//mySerialPort.write(temp);
	//mySerialPort.write(temp);
});

io.on('connection',function(client){
	console.log('Socket connected...');
	console.log(temp);
	
  	client.emit('initialMessage');

  		client.on('0', function(){
  			console.log("mouse up");
  			mySerialPort.write(message);
	 		

		});

		client.on('1', function(){
			console.log("mouse down");
	 		//mySerialPort.write('DOWN');
	 		//mySerialPort.write(message);

		});

	});




app.get('/', function(req,res){
	console.log('serving index.html');
	res.sendFile(__dirname + '/digitalWrite.html');

});

