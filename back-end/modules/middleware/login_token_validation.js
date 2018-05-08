const jwt = require('jsonwebtoken');

tokenExpire = (req, res, next) => {
    let token = req.headers['access-token'];
    if (!token) {
        return res.status(401).send({ msg: 'no token provided'});
    }
    jwt.verify(token, 'secret', (error, decoded) => {
        if (error) {
            return res.status(500).send({msg: 'failed to authenticate token'});
        }
        next();
    })

};

module.exports = { tokenExpire: tokenExpire};