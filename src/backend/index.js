import express from 'express';
import pool from './db.js';
import config from './config.js';

let app = express();
app.use(express.json());

app.get('/api/user', async function (req, res) {    
	const dbRes = await pool.query('SELECT * from users');
	res.send(dbRes.rows);
});

app.get('/api/user/:id', async function(req, res){
	let userId = req.params.id;
	const dbRes = await pool.query('SELECT * from users where id = $1', [userId]);
	res.send(dbRes.rows[0]);
});

app.post('/api/user', async function(req, res){
	const {firstname, lastname, dob, cell, email, password} = req.body;
	// console.log(user);
	const dbRes = await pool.query('INSERT INTO public.users(firstname, lastname, dob, cell, email, "password") VALUES($1, $2, $3, $4, $5, $6) returning *;', [firstname, lastname, dob, cell, email, password]);
	res.send(dbRes.rows[0]);

});

app.put('/api/user', async function(req, res){
	const {firstname, lastname, dob, cell, email, password, id} = req.body;
	
	await pool.query('UPDATE public.users SET firstname=$1, lastname=$2, dob=$3, cell=$4, email=$5, "password"=$6 WHERE id=$7', [firstname, lastname, dob, cell, email, password, id]);
	res.sendStatus(200);
});

app.listen(config.appPort, function () { 
	console.log('Server listining on port 3000');
});
