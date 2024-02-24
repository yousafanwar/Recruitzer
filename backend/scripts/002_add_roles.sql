create table if not exists roles(
    id SERIAL primary key,
	title VARCHAR(255) not null
);

INSERT INTO public.roles
(title)
VALUES('Admin');

INSERT INTO public.roles
(title)
VALUES('Client');

INSERT INTO public.roles
(title)
VALUES('Temp');

alter table users add column roleId int; 

alter table users add constraint FK_role foreign key (roleId) references roles(id);

update public.users set roleId = 1;