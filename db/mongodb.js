const { MongoClient, ServerApiVersion } = require('mongodb');
var username = encodeURIComponent("skhacker105");
var password = encodeURIComponent("Sk8886161092#");
const uri = `mongodb+srv://${username}:${password}@cluster0.edzzmnk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(err => {
            if (err) callback(err)
            _db = client.db("skops");
        });
    },

    getDb: function () {
        return _db;
    }
};