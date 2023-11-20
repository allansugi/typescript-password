create table account (
    id integer auto_increment,
    username text not null,
    email text not null,
    password varchar(65) not null,
    primary key (id)
);

create table accountStore (
    id integer auto_increment,
    userId integer,
    account_name text,
    account_email text,
    account_password text,
    primary key (id),
    foreign key (userId) 
        references account(id)
        on DELETE CASCADE
);