const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const user = require('../db_modules/user');
const mailer = require('../email/email_sender');

const multerConfig = require('../file-saver');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './pictures');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(new Error('uploading file error'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


const verificationLink = 'http://127.0.0.1:3000/users/verification';
let uuid = null;

// router.use('/', function (req, res,next){
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     next();
// });

router.post('/', upload.single('photo'), function (req, res) {
    uuid = uuidv4();
    req.body.data.photo = req.file.path;
    let newUser = {...JSON.parse(req.body.data)};
    newUser.photo = req.file.path;
    console.log("OOOOOOOO", newUser, req.file.path );

    let currDate = new Date();
    let creationDate = Date.now() + (10 * 60 * 1000);
    user.insertUser(newUser)
        .then(function (result) {
            console.log(result, uuid, creationDate);
            user.createEmailUuid(result, uuid, creationDate);
            res.status(200).send({ msg: "success" });
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