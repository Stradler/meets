const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const user = require('../db_modules/user');
const mailer = require('../email/email_sender');

const verificationLink = 'http://127.0.0.1:3000/users/verification';
let uuid = null;

router.use('/', function (req, res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

router.post('/', function (req, res) {
    console.log('BODY = ', req.body);
    uuid = uuidv4();
    let newUser = req.body;
    let currDate = new Date();
    let creationDate = Date.now() + (10 * 60 * 1000);
    user.insertUser(newUser)
        .then(function (result) {
            console.log(result, uuid, creationDate);
            user.createEmailUuid(result, uuid, creationDate);
            res.status(200).send("success");
            mailer(verificationLink + '?uuid=' + uuid);
        })
        .then(function (result) {
            console.log('28' + result);

        })
        .catch(function (result) {
            console.log(result);
        })
});

router.post('/verification/:uuid', function (req, res) {
    console.log(req.params.uuid);
    res.send(req.params.uuid);
    // let currDate = new Date();
    // let compareDate = currDate.getFullYear() + '-' + (currDate.getMonth() + 1) + '-' + currDate.getDate();
    let emailUuidQuery = 'select user_id from users_uuid where uuid = "' + req.params.uuid + '" and expiry_date >=' + Date.now();
    console.log(emailUuidQuery);
    user.selectUsers(emailUuidQuery)
        .then(function (result) {
            console.log("result= ", result);
            if (result.length !== 0) {
                console.log('asdasd', result);
                user.updateUser(result[0].user_id, { status: 1});
            }else {
                console.log('N');
            }

        })
});

module.exports = router;