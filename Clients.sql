create table Clients(

	client_id int primary key,
	client_name VARCHAR(255),
	client_address VARCHAR(255),
	client_email VARCHAR(255),
	client_phone float,
	
	agency_id int,
	foreign key (agency_id) references Agency(agency_id)  

)

insert into Clients(client_id, client_name, client_address, client_email, client_phone, agency_id) values
('201', 'Client 1', 'H, St, State', 'client1@example.com', 03123334445, 101),
('202', 'Client 2', 'H, St, State', 'client2@example.com', 03123334445, 102),
('203', 'Client 3', 'H, St, State', 'client3@example.com', 03123334445, 103);

alter table Clients 
add column booked_event int

update Clients
set booked_event = Event_Information.event_id
from Event_Information
where Clients.client_id = Event_Information.client_id

select * from Clients;