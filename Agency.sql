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

update Agency
set client_contact_list = (
	select concat(Clients.client_id, ', ' , Clients.client_name)
from Clients 
where Agency.agency_id = Clients.agency_id

) 
 

select * from Agency;