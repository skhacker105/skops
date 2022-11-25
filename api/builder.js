const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');
const auth = require("../middleware/auth");

router.get('/', (req, res) => {
    skops_mongo.connectToServer(err => {
        if (err) throw err
        skops_mongo.getDb().collection('resumeInfo').find({
            userId: req.query.userId
        }).toArray((err, result) => {
            if (err) res.json({
                error: err
            })
            if (result) {
                res.send(result);
            }
        });
    });
});

router.post('/', auth, (req, res) => {
    skops_mongo.connectToServer(err => {
        if (err) throw err
        const data = req.body;
        skops_mongo.getDb().collection('resumeInfo').find({
            userId: req.query.userId
        }).toArray((err, result) => {
            if (err) res.json({
                error: err
            })
            if (result && result.length > 0) {
                updateInfo(res, data, req.query.userId)
            } else {
                addInfo(res, data, req.query.userId)
            }
        });
    });
});

router.get('/profilePicture', (req, res) => {
    skops_mongo.connectToServer(err => {
        if (err) throw err
        skops_mongo.getDb().collection('profilePicture').find({
            userId: req.query.userId
        }).toArray((err, result) => {
            if (err) res.json({
                error: err
            })
            if (result && result.length > 0)
                res.send(result[0])
            else
                res.json({ message: 'No  image found' })
        });
    });
});

router.post('/profilepicture', auth, (req, res) => {
    skops_mongo.connectToServer(err => {
        if (err) throw err
        const data = req.body;

        skops_mongo.getDb().collection('profilePicture').find({
            userId: req.body.userId
        }).toArray((err, result) => {
            if (err) res.json({
                error: err
            })
            if (result && result.length > 0) {
                updatePicture(res, data, req.body.userId)
            } else {
                addPicture(res, data, req.body.userId)
            }
        });
    });
});

function addPicture(res, data, userId) {
    skops_mongo.getDb().collection('profilePicture').insertOne(data, (err, res1) => {
        if (err) res.json({
            error: err
        })
        if (res1) {
            res.json({ message: 'Added Successfully' });
        }
    });
}

function updatePicture(res, data, userId) {
    var myquery = { userId: userId };
    var newvalues = { $set: data };
    skops_mongo.getDb().collection('profilePicture').updateOne(myquery, newvalues, (err, res1) => {
        if (err) res.json({
            error: err
        })
        if (res1) {
            res.json({ message: 'Updated Successfully' });
        }
    });
}

function addInfo(res, data, userId) {
    skops_mongo.getDb().collection('resumeInfo').insertOne(data, (err, res1) => {
        if (err) res.json({
            error: err
        })
        if (res1) {
            res.json({ message: 'Added Successfully' });
        }
    });
}

function updateInfo(res, data, userId) {
    var myquery = { userId: userId };
    var newvalues = { $set: data };
    skops_mongo.getDb().collection('resumeInfo').updateOne(myquery, newvalues, (err, res1) => {
        if (err) res.json({
            error: err
        })
        if (res1) {
            res.json({ message: 'Updated Successfully' });
        }
    });
}

module.exports = router;