import pg from 'pg';
import config from './config.js';
const Pool = pg.Pool;

const pool = new Pool({
	host: config.dbHost,
	port: config.dbPort,
	database: config.dbName,
	user: config.dbUser,
	password: config.dbPassword,
});

export default pool;