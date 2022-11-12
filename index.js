const express = require('express');
const app = express();
const apiUsers = require('./api/users');
const cors = require('cors');
const mongo = require('./db/mongodb');

app.use(cors());
app.use(express.json());
app.use('/users', apiUsers);

mongo.connectToServer(err => {
  if (err) console.log('DB connection error')
  else console.log('DB Connection successful')
});

app.get('/', function (req, res) {
   res.send('Working');
});

var server = app.listen(3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
});