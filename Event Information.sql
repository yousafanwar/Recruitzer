create table Event_Information(

	event_id int primary key,
	date_of_application timestamp,
	start_time_date timestamp,
	end_time_date timestamp,
	required_skills VARCHAR(255),
	confirmed_workers int,
	
	client_id int,
	agency_id int,
	worker_id int,

	foreign key (client_id) references Clients(client_id),
	foreign key(agency_id) references Agency(agency_id),
	foreign key(worker_id) references Workers(worker_id)
)

insert into Event_Information (event_id, date_of_application, start_time_date, end_time_date, required_skills, confirmed_workers, client_id, agency_id)
values 
(401, '2023-12-27 06:45:00', '2023-12-31 22:00:00', '2023-12-31 23:59:00', 'Event Management', 5, 201, 101);

alter table Event_Information
drop worker_id 

select * from Event_Information;