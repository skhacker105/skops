const express = require('express');
const app = express();
const apiUsers = require('./api/users');
const apiResumeBuilder = require('./api/builder');
const apiVisitor = require('./api/visitors');
const cors = require('cors');
const mongo = require('./db/mongodb');
var multer = require('multer');
var upload = multer();

mongo.connectToServer(err => {
  if (err) console.log('DB connection error = ', err);
  else console.log('DB Connection successful')
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(upload.array()); 
app.use(express.static('public'));

app.use('/users', apiUsers);
app.use('/apiBuilder', apiResumeBuilder);
app.use('/visitor', apiVisitor);

app.get('/', function (req, res) {
   res.send('Working');
});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});