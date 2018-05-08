const express = require('express');
const router = express.Router();
const user = require('../db_modules/user');
const jwt = require('jsonwebtoken');

const mw = require('../middleware/login_token_validation');

router.post('/', /*mw.tokenExpire,*/ (req, res) => {
    let query = 'select id, email, password from users where ' +
        'email = "' + req.body.email + '" and ' +
        'password = "' + req.body.password + '";';
    console.log(query);
    user.selectUsers(query)
        .then((result) => {
            if (result.length === 0) {
                res.status(500).send({ msg: 'no user'});
            }
            console.log(result);
            let token = jwt.sign({ email: result[0].email } , 'secret', { expiresIn: 120 });
            res.status(200).send({ token:token });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).send({ msg: 'req error' });
        });
});

module.exports = router;