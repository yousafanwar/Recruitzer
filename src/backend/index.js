import express from 'express';
import pool from './db.js';
import config from './config.js';

let app = express();

app.get('/api/user', async function (req, res) {    
	const dbRes = await pool.query('SELECT * from users');
	res.send(dbRes.rows);
});

app.get('/api/user/:id', async function(req, res){
	let userId = req.params.id;
	const dbRes = await pool.query('SELECT * from users where id = $1', [userId]);
	res.send(dbRes.rows[0]);
});

app.listen(config.appPort, function () { 
	console.log('Server listining on port 3000');
});