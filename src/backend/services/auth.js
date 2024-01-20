import * as db from '../db/db.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import bcrypt from 'bcrypt';

export const authenticate = function (req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) {
		res.status(401).send('Token not provided');
	}
	jwt.verify(token, config.secret, function (error) {
		if (error) {
			res.status(401).send('Login Unsuccessful');
		} else {
			next();
		}
	});
};

export const login = async function (req, res) {
	const { email, password } = req.body;
	const dbRes = await db.query('SELECT * from users where email = $1', [email]);
	if (dbRes.rowCount < 1) {
		return res.status(401).send('Invalid Email or password');
	}

	const hash = dbRes.rows[0].password;

	bcrypt.compare(password, hash, async function (err, result) {
		if (err || !result) {
			res.send(401);
			return;
		} else {
			let token = jwt.sign({ email: email }, config.secret);
			res.json(token);
		}
	});
};
