// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
  
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function (req, res) {
  res.json({'unix': Date.parse(new Date()) , 'utc': new Date().toUTCString()})
});

app.get('/api/:date', (req,res)=>{

  const date = req.params.date;

  const dateReg = /^[-+]?[0-9]+$/
  
  if(dateReg.test(date) || date === ''){
    res.json({'unix': Number(date), 'utc': new Date(Number(date)).toUTCString()})
    console.log('entro aqui',date)
  }else if(Date.parse(date)){
    res.json({'unix': Date.parse(date) , 'utc': new Date(date).toUTCString()})
  }else{
    res.json({'error':'Invalid Date'})
  }
  

});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
