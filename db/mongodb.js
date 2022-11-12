const { MongoClient } = require('mongodb');
var username = encodeURIComponent("skhacker105");
var password = encodeURIComponent("Sk8886161092#");
const uri = `mongodb+srv://${username}:${password}@cluster0.edzzmnk.mongodb.net/?retryWrites=true&w=majority`;
const _db = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// var _db;

module.exports = {
    dbConnectionTest: function (res) {
        client.connect(err => {
            if (err) res.json({ error: 'Connection Error - ' + err })
            const users = client.db("skops").collection("users");
            // perform actions on the collection object
            // users.find({

            // })
            client.close();
            res.send('DB Connection Successfull');
        });
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