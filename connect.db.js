const sql = require('mssql')
const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

const logger = winston.createLogger(logConfiguration);

logger.info('Hello, Winston!');

const sqlConfig = {
    user: 'indepe2040',
    password: 'Independencia2040',
    database: 'independencia',
    server: 'indepe2040.database.windows.net',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

console.log("Starting...");
connectAndQuery();
async function connectAndQuery() {
    try {
        await sql.connect(sqlConfig)
        const result = await sql.query('select * from Person')
        logger.info(result)
        logger.info(result)
        logger.info('Hello, Winston!')
    } catch (err) {
        logger.error(err)
    }
}
