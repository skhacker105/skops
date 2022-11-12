const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const helper = require("../helper");

router.get('/info', (req, res) => {
    const token = helper.getToken(req);
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        decoded['token'] = token;
        res.send(decoded);
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;
    skops_mongo.getDb().collection('users').find({
        email: email,
        password: pass
    }).toArray((err, result) => {
        if (err) res.json({ error: err })
        if (result) {
            console.log('result = ', result);
            result[0]['token'] = jwt.sign(
                result[0],
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            res.send(result);
        }
    });

});

router.get('/validatetoken', auth, (req, res) => {
    res.send('Valid Token')
});

router.get('/logout', auth, (req, res) => {
    res.status(200).send({ auth: false, token: null });
});
module.exports = router;