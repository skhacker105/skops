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
            // users = _db.db("skops").collection(collection);
            // users.find().toArray((err, result) => {
            //     _db.close();
            //     if (err) res.json({msg: 'User find error -- ' + err})
            //     res.json(result);
            // });
        });
    },

    dbConnectionTest: function (res) {
        _db.connect(err => {
            if (err) res.json({ error: 'Connection Error - ' + err })
            const users = _db.db("skops").collection("users");
            users.find().toArray((err, result) => {
                _db.close();
                if (err) res.json({ msg: 'User find error -- ' + err })
                res.json(result);
            });
        });
    },

    getDb: function () {
        return _db;
    }
};

// module.exports = {

//     connectToServer: function (callback) {
//         try {
//             MongoClient.connect(uri, function (err, client) {
//                 _db = client.db('skops');
//                 return callback(err);
//             });
//         } catch(ex) {
//             return callback(ex);
//         }
//     },

//     reconnectToServer: function(res) {
//         console.log('Reconnecting to DB Server using -- ', uri);
//         try {
//             MongoClient.connect(uri, function (err, client) {
//                 _db = client.db('skops');
//                 res.json({
//                     err: err,
//                     client, client
//                 });
//             });
//         } catch(ex) {
//             res.send(ex);
//         }
//     },

//     getDb: function () {
//         return _db;
//     }
// };