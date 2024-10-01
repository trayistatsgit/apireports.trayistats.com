const sql = require('mssql');

// Database configuration
const config = {
    server:"68.178.207.198",  // ip address of server running mysql
    user: 'tsstagingplatform',    // user name to your mysql database
    password:'@TSStaging$123106',
    database: 'staging_tsplatform', // use the specified database
    connectionTimeout: 30000, // 30 seconds
    requestTimeout: 60000, // 60 seconds
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true    
        },
    port:  1433,
    pool : {
        min : 1,
        max : 1000
    }
};

 

// Create MSSQL connection pool
const pool = new sql.ConnectionPool(config);

// Function to connect to the database
async function connect() {
    try {
        await pool.connect();
        console.log('Connected to MSSQL database');
    } catch (err) {
        console.error('Error connecting to MSSQL database:', err);
    }
}

// Connect to the database when the file is loaded
connect();

// Export the pool object for global use
module.exports = {
    pool
};
