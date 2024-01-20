drop table if exists users;

create table if not exists users(
id SERIAL primary key,
	firstName VARCHAR(255) not null,
	lastName VARCHAR(255) not null,
	DOB VARCHAR(50) not null,
	cell VARCHAR(50),
	email VARCHAR(50) not null unique,
	"password" VARCHAR(255) not null
);

INSERT INTO public.users
(firstname, lastname, dob, cell, email, "password")
VALUES('firstname usr1', 'lastname usr1', '01-01-2000', '1234567', 'usr1@example.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzcjExQGV4YW1wbGUuY29tIiwiaWF0IjoxNzA1NzQ5MDA1fQ.r3KNbWwPGQ2_vQmAym1S9cuGeem_9AFxKqU4Bwqx1as');



