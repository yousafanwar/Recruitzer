create table Agency(
	id SERIAL primary key,
	name VARCHAR(255),
	email VARCHAR(255),
	phone VARCHAR(20)		
);

create table Gender(
	id SERIAL primary key,
	name VARCHAR(255)
);

create table Worker(
	id SERIAL primary key,
	firstName VARCHAR(255),
	lastName VARCHAR(255),
	mobile VARCHAR(50),
	availability BOOLEAN,
--	FOREIGN KEYS
	genderId int,
	
	CONSTRAINT FK_worker_gender FOREIGN KEY(genderId)
        REFERENCES Gender(id)
  
);

create table Clients(
	id SERIAL primary key,
	firstName VARCHAR(255),
	lastName VARCHAR(255),
	email VARCHAR(255),
	phone VARCHAR(255),
--	FOREIGN KEYS	
	genderId int,

	CONSTRAINT FK_client_gender FOREIGN KEY(genderId)
	REFERENCES Gender(id)
)

create table EventInfo(
	id SERIAL primary key,
	title VARCHAR(200),
	eventStartDate date,
	eventStartTime time,
	eventEndDate date,
	eventEndTime time,
	discription VARCHAR(255),
	skillsReq VARCHAR(255),
	status VARCHAR(50),
--	FOREIGN KEYS
	agencyId int,
	clientId int,
	
	constraint FK_agency_address foreign key (agencyId)
	references Agency(id),
		
	constraint FK_client_address foreign key (clientId)
	references Clients(id)
)

create table Address(
	id SERIAL primary key,
	streetNo int,
	streetName VARCHAR(50),
	city VARCHAR(50),
	state VARCHAR(50),
	zipCode int,
	country VARCHAR(50),
--	FOREIGN KEYS
	agencyId int,
	workerId int,
	clientId int,
	eventId int,
	
	constraint FK_agency_address foreign key (agencyId)
	references Agency(id),
	
	constraint FK_worker_address foreign key (workerId)
	references Worker(id),
	
	constraint FK_client_address foreign key (clientId)
	references Clients(id),
	
	constraint FK_event_address foreign key (eventId)
	references EventInfo(id)
	
	)




create table Skills(
	id SERIAL primary key,
	name VARCHAR(255)
);

create table WorkerSkills( 
--THIS IS THE JUNCTION TABLE BETWEEN WORKERS AND SKILLS
	workerId int,
	skillId int,
	
	CONSTRAINT FK_worker_skill FOREIGN KEY(skillId)
        REFERENCES Skills(id),
        
   	CONSTRAINT FK_worker_id FOREIGN KEY(workerId)
        REFERENCES Worker(id)
);



create table eventsForWorkers(
	id SERIAL primary key,
	workerId int,
	eventId int,
	
	constraint FK_worker_event foreign key (workerId)
	references Worker(Id),
	
	constraint FK_event_worker foreign key(eventId)
	references EventInfo(id)
)












