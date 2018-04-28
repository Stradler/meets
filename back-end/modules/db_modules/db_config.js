const mysql = require('mysql');

const connectionSettings = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '7744',
    database: 'meets'
};
const pool = mysql.createPool({
    connectionLimit: 10,
    host: connectionSettings.host,
    port: connectionSettings.port,
    user: connectionSettings.user,
    password: connectionSettings.password,
    database: connectionSettings.database
});

module.exports = pool;