create table Workers(

	worker_id int primary key,
	worker_name VARCHAR(255),
	worker_address VARCHAR(255),
	worker_phone float,
	skills VARCHAR(255),
	availability BOOLEAN,
	Attendence BOOLEAN,
	
	agency_id int,
	foreign key (agency_id) references Agency(agency_id)
	
)

insert into Workers (worker_id, worker_name, worker_address, worker_phone, skills, availability, Attendence, agency_id)
values 
(301, 'Worker1', 'H, St, State', 03123334445, 'Cleaner', true, true, 101),
(302, 'Worker2', 'H, St, State', 03123334445, 'Cleaner', true, true, 102),
(303, 'Worker3', 'H, St, State', 03123334445, 'Cleaner', true, true, 103);

update Workers
set availability = false
where worker_id = 301;

update Workers
set attendence = false
where worker_id = 303;

update Workers
set skills = 'Janitor'
where worker_id = 302;

update Workers
set skills = 'Carpenter'
where worker_id = 303;

select * from Workers;