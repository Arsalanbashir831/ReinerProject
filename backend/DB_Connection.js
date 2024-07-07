const mysql = require('mysql');

// MySQL database connection configuration
const db = mysql.createConnection({
    host: 'sql157.your-server.de',
    user: 'gndata_r',
    password: 'P97l69iu50klVuE8',
    database: 'gndata'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', db.threadId);
});

module.exports = db;
