const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let usersRoutes = require('./modules/routes/users_routes');

app.use('/users', usersRoutes);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');

});