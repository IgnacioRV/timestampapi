var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 5000));

var monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];

function getMonthName(month) {
    return monthNames[month];
};
/*
var bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({extended: false}))
*/
app.get('/', (req, res)=>{
	res.send("This timestamp API was created by Ignacio Rasche, add /'unix timestamp' or /'natural language time' to the url to get the JSON with the processed data")
})

app.get('/favicon.ico', (req, res)=>{})

app.get('/:data', function (req, res) {
  var data = parseInt(req.params.data)
  var date = new Date(data*1000);
  var isTS = date.getDate() > 0
  var obj = {
  	"unix": null,
  	"natural": null
  }
  if (isTS){
  	console.log("It's a unix timestamp")
  	obj.unix = data
  	obj.natural = naturalize(date)
  }
  else {
  	console.log("NOT a unix timestamp")
  	data = req.params.data
  	console.log(data)
  	dat = new Date (Date.parse(data))
  	console.log(dat)
  	var isNT = dat.getDate() > 0
  	if (isNT){
  		obj.unix = dat.getTime()
  		obj.natural = naturalize(dat)
  		console.log("IT'S A VALID DATE")
  
  	}

}
  	res.send(obj)
 
});

function naturalize (date){
	var str = ""
	str += getMonthName(date.getMonth())
	str += " "
	str += date.getDate()
	str += ", "
	str += date.getFullYear()
	return str
}
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

