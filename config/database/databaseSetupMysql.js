const mysql = require('mysql2');
//const env = require('../env');

const pool = mysql.createPool({
    connectionLimit : 100,
    host: '208.109.33.187',  // ip address of server running mysql
    port:  "3306",
    user: 'tsplatform',    // user name to your mysql database
    password: 'iKHJ5zKY0OoojWH',
    database: 'tsplatform', // use the specified database
    multipleStatements: true
});

const mssql = {
    server: process.env.MS_DATABASE_SERVER,  // ip address of server running mysql
    user: process.env.MS_DATABASE_USER,    // user name to your mysql database
    password: process.env.MS_DATABASE_PASSWORD,
    database: process.env.MS_DATABASE_DATABASE, // use the specified database
    connectionTimeout: 30000, // 30 seconds
    requestTimeout: 60000, // 60 seconds
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true
    },
    port:  1433
}

module.exports = {
    pool,
    mssql
};

