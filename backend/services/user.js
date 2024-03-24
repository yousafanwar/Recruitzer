import bcrypt from 'bcrypt';
import config from '../config.js';
import * as db from '../db/db.js';

export const getUsers = async function (req, res) {
	console.log(req.query);
	let order = '';
	let { searchText, page, pageCount, orderByCol, orderDir } = req.query;
	let whereClause = ' where isDeleted = false ';
	if (searchText !== undefined && searchText !== '') {
		whereClause += `AND (firstName like '%${searchText}%' OR lastName like '%${searchText}%' OR email like '%${searchText}%' OR cell like '%${searchText}%')`;
	}
	if (!page) {
		page = 1;
	}
	if (!pageCount) {
		pageCount = 10;
	}
	if (!orderDir) {
		order = ' asc ';
	} else {
		order = ' desc ';
	}
	let orderBy = ' order by ';
	if (!orderByCol || orderByCol === '') {
		orderBy += 'users.id';
	} else {
		orderBy += 'users.' + orderByCol;
	}
	const offSet = ` offset ${(page - 1) * pageCount} limit ${pageCount} `;

	let dbRes = await db.query('select count(users.id) as TotalRecords from public.users ' + whereClause);
	const totalRecords = dbRes.rows[0].totalrecords;

	dbRes = await db.query(
		'select users.id, users.firstName, users.lastName, users.DOB, users.cell, users.email, users.password, users.isDeleted, roles.title as role from public.users full outer join roles on users.roleid = roles.id ' +
			whereClause +
			orderBy +
			order +
			offSet
	);

	res.send({
		page,
		pageCount,
		totalRecords,
		records: dbRes.rows
	});
};

// route handler to fetch individual user
export const getUser = async function (req, res) {
	const userId = req.params.id;
	const dbRes = await db.query('SELECT * from users where id = $1 and isDeleted = false', [userId]);
	if (dbRes.rowCount > 0) {
		res.send(dbRes.rows[0]);
	} else {
		res.send('User does not exists').sendStatus(404);
	}
};

export const addUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, roleId } = req.body;
	let dbRes = await db.query('SELECT * from users where email = $1', [email]);
	if (dbRes.rowCount > 0) {
		console.log(`User with email ${email} already exists`);
		return res.status(409);
	}
	bcrypt.hash('', config.saltRounds, async function (err, hash) {
		dbRes = await db.query('INSERT INTO public.users(firstname, lastname, dob, cell, email, "password", roleId) VALUES($1, $2, $3, $4, $5, $6, $7) returning *;', [
			firstname,
			lastname,
			dob,
			cell,
			email,
			hash,
			roleId
		]);
		res.send(dbRes.rows[0]);
	});
};

export const updateUser = async function (req, res) {
	const { firstname, lastname, dob, cell, email, id } = req.body;

	await db.query('UPDATE public.users SET firstname=$1, lastname=$2, dob=$3, cell=$4, email=$5 WHERE id=$6', [firstname, lastname, dob, cell, email, id]);
	res.sendStatus(200);
};

export const deleteUser = async function (req, res) {
	const id = req.params.id;

	db.query('UPDATE public.users SET isdeleted=true WHERE id=$1', [id]);
	res.sendStatus(200);
};
