const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');

router.get('/', (req, res) => {
    const email = req.query.email;
    const pass = req.query.pass;
    try {
        skops_mongo.getDb().collection('users').find({
            email: email,
            password: pass
        }).toArray((err, result) => {
            if (err) res.send(err)
            if (result) {
                res.json(result);
            }
        });
    } catch (ex) {
        res.json({
            error: ex
        })
    }

});
module.exports = router;