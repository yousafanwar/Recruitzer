import bcrypt from 'bcrypt';
import config from '../config.js';
import * as db from '../db/db.js';

export const getUsers = async function (req, res) {
	const dbRes = await db.query('SELECT * from users where isDeleted = False');
	res.send(dbRes.rows);
};

// route handler to fetch individual user
export const getUser = async function (req, res) {
	let userId = req.params.id;
	const dbRes = await db.query('SELECT * from users where id = $1 and isDeleted = false', [userId]);
	if (dbRes.rowCount > 0) {
		res.send(dbRes.rows[0]);
	} else {
		res.send('User does not exists').sendStatus(404);
	}
};

export const addUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, password, roleId } = req.body;
	let dbRes = await db.query('SELECT * from users where email = $1', [email]);
	if (dbRes.rowCount > 0) {
		console.log(`User with email ${email} already exists`);
		return res.status(409);
	}
	bcrypt.hash(password, config.saltRounds, async function (err, hash) {
		dbRes = await db.query('INSERT INTO public.users(firstname, lastname, dob, cell, email, "password", roleId) VALUES($1, $2, $3, $4, $5, $6, $7) returning *;', [firstname, lastname, dob, cell, email, hash, roleId]);
		res.send(dbRes.rows[0]);
	});
};

export const updateUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, password, id } = req.body;

	await db.query('UPDATE public.users SET firstname=$1, lastname=$2, dob=$3, cell=$4, email=$5, "password"=$6 WHERE id=$7', [firstname, lastname, dob, cell, email, password, id]);
	res.sendStatus(200);
};

export const deleteUser = async function (req, res) {
	const id = req.params.id;

	db.query('UPDATE public.users SET isdeleted=true WHERE id=$1', [id]);
	res.sendStatus(200);
};
