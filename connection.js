let mysql = require('mysql');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'confeccioneslyz',
});

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err;
//     console.log('The solution is: ', rows[0].solution);
// });

// connection.end();

module.exports = connection;
