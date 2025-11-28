const sql = require('mssql');
require('dotenv').config();

const config = {
    server: process.env.DB_SERVER || 'localhost',
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let pool = null // create a pool connection

// connect to database
async function connect() {
    try {
        if (pool) {
            return pool;
        }

        pool = await sql.connect(config);
        console.log('Connected to SQL Server');
        return pool;
    }
    catch (err) {
        console.error('Database Connection Failed! Bad Config: ', err);
        throw err;
    }
}

// close the database connection
async function close() {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            console.log('Database connection closed.');
        }
    } catch (err) {
        console.error('Error closing the database connection: ', err);
        throw err;
    }
}

// execute a query
async function query(queryString, params = {}) {
    try {
        const pool = await connect();
        const request = pool.request();

        // add parameters to the request
        for (const param in params) {
            request.input(param, params[param]);
        }

        const result = await request.query(queryString);
        return result;
    } catch (err) {
        console.error('Query Failed: ', err);
        throw err;
    }
}

module.exports = {
    connect,
    close,
    query,
    sql
};