create table Agency(

	agency_id int primary key,
	service_name VARCHAR(255),
	commision_rate VARCHAR(255),
	client_contact_list VARCHAR(255),
	worker_contact_list VARCHAR(255)
		

)

insert into Agency (agency_id, service_name, commision_rate) values
(101, 'Cleaner', '5%'),
(102, 'Janitor', '6%'),
(103, 'Gardner', '3%');


alter table Agency
drop client_contact_list 

update Agency 
set worker_contact_list = (
	select concat(Workers.worker_id, ', ' ,Workers.worker_name)
) 
from Workers
where Agency.agency_id = Workers.agency_id; 

update Agency 
set service_name = 'Event Management'
where agency_id = 101

select * from Agency;