const { Pool } = require('pg');
require('dotenv').config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT) || 5432,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

let pool = null;

// connect to database
async function connect() {
    try {
        if (pool) {
            return pool;
        }

        pool = new Pool(config);

        // Test connection
        const client = await pool.connect();
        console.log('Connected to PostgreSQL');
        client.release();

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
            await pool.end();
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

        // Convert params object to array for PostgreSQL
        // PostgreSQL uses $1, $2, $3... instead of named parameters
        const paramKeys = Object.keys(params);
        const paramValues = paramKeys.map(key => params[key]);

        // Replace @paramName with $1, $2, etc.
        let pgQuery = queryString;
        paramKeys.forEach((key, index) => {
            const regex = new RegExp(`@${key}\\b`, 'g');
            pgQuery = pgQuery.replace(regex, `$${index + 1}`);
        });

        const result = await pool.query(pgQuery, paramValues);
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
    pool
};