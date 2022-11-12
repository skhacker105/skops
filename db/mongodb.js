const { MongoClient } = require('mongodb');
var username = encodeURIComponent("skhacker105");
var password = encodeURIComponent("Sk8886161092#");
const uri = `mongodb+srv://${username}:${password}@cluster0.edzzmnk.mongodb.net/?retryWrites=true&w=majority`;

var _db;

module.exports = {

    connectToServer: function (callback) {
        MongoClient.connect(uri, function (err, client) {
            _db = client.db('skops');
            return callback(err);
        });
    },

    getDb: function () {
        return _db;
    }
};