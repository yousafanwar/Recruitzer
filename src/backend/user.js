import pool from './db.js';
import bcrypt from 'bcrypt';
import config from './config.js';

export const getUsers = async function (req, res) {
	const dbRes = await pool.query('SELECT * from users');
	res.send(dbRes.rows);
};

// route handler to fetch individual user
export const getUser = async function (req, res) {
	let userId = req.params.id;
	const dbRes = await pool.query('SELECT * from users where id = $1', [userId]);
	res.send(dbRes.rows[0]);
};

export const addUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, password } = req.body;
	let dbRes = await pool.query('SELECT * from users where email = $1', [email]);
	if (dbRes.rowCount > 0) {
		console.log(`User with email ${email} already exists`, email);
		return res.sendStatus(409);
	}
	bcrypt.hash(password, config.saltRounds, async function (err, hash) {
		dbRes = await pool.query('INSERT INTO public.users(firstname, lastname, dob, cell, email, "password") VALUES($1, $2, $3, $4, $5, $6) returning *;', [firstname, lastname, dob, cell, email, hash]);
		res.send(dbRes.rows[0]);
	});
};

export const updateUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, password, id } = req.body;

	await pool.query('UPDATE public.users SET firstname=$1, lastname=$2, dob=$3, cell=$4, email=$5, "password"=$6 WHERE id=$7', [firstname, lastname, dob, cell, email, password, id]);
	res.sendStatus(200);
};
