const express = require('express');
const router = express.Router();
const skops_mongo = require('../db/mongodb');
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const helper = require("../helper");

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
        // res.json({
        //     err: err,
        //     msg: err ? 'Error' : 'DB Connection successful'
        // });
    });
    // console.log('email = ', email);
    // console.log('pass = ', pass);
    // if (skops_mongo.getDb()) {
    //     skops_mongo.getDb().collection('users').find({
    //         email: email,
    //         password: pass
    //     }).toArray((err, result) => {
    //         if (err) res.json({
    //             email: email,
    //             pass: pass,
    //             error: err
    //         })
    //         console.log('result = ', result);
    //         if (result) {
    //             res.send(result);
    //         }
    //     });
    // } else {
    //     res.json({
    //         email: email,
    //         pass: pass,
    //         error: 'No DB found'
    //     })
    // }

});

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
            res.status(404).send('No result found');
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