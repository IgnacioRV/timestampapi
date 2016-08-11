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
app.get('/:data', function (req, res) {
  var data = parseInt(req.params.data)
  var date = new Date(data*1000);
  var isTS = date.getTime() > 0
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
  	var isNT = date.getTime() > 0
  	if (isNT){
  	obj.unix = dat.getTime()
  	obj.natural = naturalize(dat)
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

