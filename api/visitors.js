const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');
const IP = require('ip');

router.get('/', (req, res) => {
    skops_mongo.connectToServer(err => {
        skops_mongo.getDb().collection('visitor').find().toArray((err, result) => {
            if (err) res.json({
                error: err
            })
            res.json({
                message: result ? result.length : 0
            });
        });
    });
});

router.post('/', (req, res) => {
    const ipAddress = IP.address();
    const query = { ipAddress: ipAddress };
    const data = req.body;
    data['ipAddress'] = ipAddress
    const update = { $set: data };
    const options = { upsert: true };
    skops_mongo.connectToServer(err => {
        skops_mongo.getDb().collection('visitor').updateOne(query, update, options, (err, res1) => {
            if (err) res.json({
                error: err
            })
            if (res1) {
                res.json({ message: 'Added Successfully' });
            }
        });
    });
});

router.get('/ip', (req, res) => {
    console.log('x-forwarded-for = ', req. socket. localAddress)
    res.send(req. socket. localAddress);
    // res.json([req.ip, req.socket.remoteAddress]);
});

module.exports = router;