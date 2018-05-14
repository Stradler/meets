const pool = require('./db_config');

getAllDrinkingSmoking = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            let query = 'select id, name from drinking_smoking';
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

module.exports = { getAllDrinkingSmoking: getAllDrinkingSmoking};