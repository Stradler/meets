const pool = require('./db_config');

getAllInterests = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            let query = 'select id, name from interests';
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

module.exports = { getAllInterests: getAllInterests};