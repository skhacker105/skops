const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');

router.get('/', (req, res) => {
    const email = req.query.email;
    const pass = req.query.pass;
    if (skops_mongo.getDb()) {
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
                res.json(result);
            }
        });
    } else {
        res.json({
            email: email,
            pass: pass,
            error: 'No DB found'
        })
    }

});
module.exports = router;