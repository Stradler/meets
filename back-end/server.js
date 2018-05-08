const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


let usersRoutes = require('./modules/routes/users_routes');
let loginRoutes = require('./modules/routes/login_routes');

app.use('/', function (req, res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});