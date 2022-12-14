const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const helper = require("../helper");
const mongo = require('../db/mongodb');

router.get('/', (req, res) => {
    skops_mongo.connectToServer(err => {
        if (err) throw err
        const email = req.query.email;
        const pass = req.query.pass;
        skops_mongo.getDb().collection('users').find({
            email: email,
            password: pass
        }).toArray((err, result) => {
            if (err) res.json({
                email: email,
                pass: pass,
                error: err
            })
            if (result) {
                res.send(result);
            }
        });
    });
});

router.get('/info', (req, res) => {
    const token = helper.getToken(req);
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        decoded['token'] = token;
        res.send(decoded);
    } catch (err) {
        return res.status(401).json({ message: "Invalid Token" });
    }
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    mongo.connectToServer(err => {
        if (err) console.log('DB connection error = ', err);
        else {
            console.log('DB Connection successful')
            try {
                skops_mongo.getDb().collection('users').find({
                    email: email,
                    password: pass
                }).toArray((err, result) => {
                    if (err) res.status(401).json({ error: err })
                    if (result && result.length > 0) {
                        result[0]['token'] = jwt.sign(
                            result[0],
                            process.env.TOKEN_KEY,
                            {
                                expiresIn: "1h",
                            }
                        );
                        res.send(result);
                    } else {
                        res.status(404).json({ message: 'No result found' });
                    }
                });
            } catch (err) {
                res.status(500).json({ message: err });
            }
        }
    });

});

router.put('/layout', auth, (req, res) => {
    const userId = req.query.userId;
    const layout = req.query.layout;
    var myquery = { _id: userId };
    var newvalues = { $set: {
        layout: layout
    } };
    skops_mongo.getDb().collection('users').updateOne(myquery, newvalues, (err, res1) => {
        if (err) res.json({
            error: err
        })
        if (res1) {
            res.json({ message: 'Updated Successfully' });
        }
    });
});

router.get('/validatetoken', auth, (req, res) => {
    res.json({ message: 'Valid Token' })
});

router.get('/logout', auth, (req, res) => {
    res.status(200).send({ auth: false, token: null });
});
module.exports = router;