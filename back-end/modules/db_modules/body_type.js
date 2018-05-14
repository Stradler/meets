const pool = require('./db_config');

getAllBodyTypes = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            let query = 'select id, name from body_types';
            connection.query(query, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.release();
            });
        });
    });
};

module.exports = { getAllBodyTypes: getAllBodyTypes};