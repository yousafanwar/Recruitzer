create table if not exists users(
id SERIAL primary key,
	firstName VARCHAR(255),
	lastName VARCHAR(255),
	DOB VARCHAR(50),
	cell VARCHAR(50),
	email VARCHAR(50),
	"password" VARCHAR(50)
);

INSERT INTO public.users
(firstname, lastname, dob, cell, email, "password")
VALUES('firstname usr1', 'lastname usr1', '01-01-2000', '1234567', 'usr1@example.com', 'password123');


