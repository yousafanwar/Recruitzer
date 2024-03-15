import pg from 'pg';
import config from '../config.js';
const Pool = pg.Pool;

const pool = new Pool({
	host: config.dbHost,
	port: config.dbPort,
	database: config.dbName,
	user: config.dbUser,
	password: config.dbPassword
});

export const query = async function (sql, params) {
	if(config.enableDbLogging){
		console.log('Executing query: ');
		console.log(sql);
	}
	const startTime = Date.now();
	const result = await pool.query(sql, params);
	const duration = Date.now() - startTime;
	if (config.enableDbLogging) {
		console.log('Executed query successfuly', { sql, params, duration, rows: result.rowCount });
	}
	return result;
};
