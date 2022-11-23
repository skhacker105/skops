const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI, USER_NAME, PASSWORD, DATABASE } = process.env;
var username = encodeURIComponent(USER_NAME);
var password = encodeURIComponent(PASSWORD);
const uri = MONGO_URI.replace('<username>', username).replace('<password>', password);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(err => {
            _db = client.db(DATABASE);
            if (err) callback(err)
            else callback()
        });
    },

    getDb: function () {
        return _db;
    }
};