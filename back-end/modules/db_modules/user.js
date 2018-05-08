const pool = require('./db_config');

function insertUser(user) {
    console.log(user);
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
                connection.release();
            });
        });
    });
}

function selectUsers(query) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.query(query, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.release();
            });
        });
    });
}

function updateUser(id, userData) {
    console.log(id, userData);
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.query('UPDATE users SET ? where id = ' + id + ';', userData, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.release();
            });
        });
    });
}

function createEmailUuid(userID, uuid, creationDate) {
    console.log(userID, uuid, creationDate);

    var data = { uuid: uuid, user_id: userID, expiry_date: creationDate };
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            connection.query('INSERT INTO users_uuid SET ?', data, function (error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
                connection.release();
            });
        });
    });
}

module.exports = { insertUser: insertUser,
                    selectUsers: selectUsers,
                    updateUser: updateUser,
                    createEmailUuid: createEmailUuid};