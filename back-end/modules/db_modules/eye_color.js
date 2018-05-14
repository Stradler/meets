const pool = require('./db_config');

getAllEyeColors = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            let query = 'select id, name from eye_colors';
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

module.exports = { getAllEyeColors: getAllEyeColors};