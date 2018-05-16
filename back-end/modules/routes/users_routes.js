const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const user = require('../db_modules/user');
const body_type = require('../db_modules/body_type');
const eye_color = require('../db_modules/eye_color');
const hair_color = require('../db_modules/hair_color');
const drinking_and_smoking = require('../db_modules/drinking_and_smoking');
const language = require('../db_modules/language');
const interest = require('../db_modules/interest');
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

router.get('/inputs-data' , (req, res) => {
    const queries = [
        body_type.getAllBodyTypes(),
        eye_color.getAllEyeColors(),
        hair_color.getAllHairColors(),
        drinking_and_smoking.getAllDrinkingSmoking(),
        language.getAllLanguages(),
        interest.getAllInterests(),
    ];

    Promise.all(queries)
        .then(result => {
            const data = {};
            data.body_type = result[0];
            data.eye_color = result[1];
            data.hair_color = result[2];
            data.drinking_and_smoking = result[3];
            data.language = result[4];
            data.interest = result[5];
            res.status(200).send(data);
        })
});

router.get('/edit-profile', (req, res) => {
   let userId = req.headers.id;
   let query = 'select ' +
       'users.id, ' +
       'users.name, ' +
       'users.date_of_birth, ' +
       'users.about, ' +
       'users.height, ' +
       'users.weight, ' +
       'users.photo, ' +
       'users.body_type as body_type_id, ' +
       'body_types.name as body_type_name, ' +
       'users.eye_color as eye_color_id, ' +
       'eye_colors.name as eye_color_name, ' +
       'users.hair_color as hair_color_id, ' +
       'hair_colors.name as hair_color_name, ' +
       'users.drinking as drinking_id, ' +
       't1.name as drinking, ' +
       'users.smoking as smoking_id, ' +
       't2.name as smoking ' +
       'from users ' +
       'left join body_types on ( users.body_type = body_types.id) ' +
       'left join eye_colors on ( users.eye_color = eye_colors.id) ' +
       'left join hair_colors on ( users.hair_color = hair_colors.id) ' +
       'left join drinking_smoking t1 on ( users.drinking = t1.id) ' +
       'left join drinking_smoking t2 on ( users.smoking = t2.id) ' +
       'where users.id = ' + userId + ';';


   let queryUsersLanguages = 'select languages.id, languages.name from languages\n' +
       'left join users_languages on (languages.id = users_languages.language_id)\n' +
       'where users_languages.user_id = ' + userId + ';';
   let queryUserInterests = 'select interests.id, interests.name from interests\n' +
        'left join users_interests on (interests.id = users_interests.interest_id)\n' +
        'where users_interests.user_id = ' + userId + ';';

   let userLangs = user.selectUsers(queryUsersLanguages);
   let userData = user.selectUsers(query);
   let userInterest = user.selectUsers(queryUserInterests);
   Promise.all([userData, userLangs, userInterest]).then(result => {
       console.log(result);
       if (result[0].length === 0) {
           return res.status(404).send({ msg: 'user not found'})
       }
       let user = Object.assign(...result[0]);
       user.languages = result[1];
       user.interests = result[2];
       res.send(user);
   })
       .catch(() => res.status(500).send({ msg: 'error'}))
});


module.exports = router;