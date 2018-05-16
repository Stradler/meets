const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('pictures'));
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

let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {

    console.log('user connected');
    socket.join(socket.handshake.query.dialog_id, () => {console.log(socket.rooms)});
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.to(socket.handshake.query.dialog_id).emit('message', {type:'new-message', text: message});
    });
});

http.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});