const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');

router.get('/', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    skops_mongo.getDb().collection('users').find({
        email: email,
        password: pass
    }).toArray((err, result) => {
        if (err) throw err
        if (result) {
            res.json(result);
        }
    });
    
});
module.exports = router;