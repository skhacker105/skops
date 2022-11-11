const express = require('express');
const app = express();
const apiUsers = require('./api/users');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/users', apiUsers);

app.get('/', function (req, res) {
    res.send('Working');
 })
 

 var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 });