create table blacklisted_tokens
(
    id    int auto_increment
        primary key,
    token varchar(255) not null
);

create table users
(
    id       int auto_increment
        primary key,
    name     varchar(50)                  not null,
    password varchar(100)                 not null,
    rol      varchar(25)                  null,
    status   varchar(25) default 'Active' null,
    constraint name
        unique (name)
);

create table asist
(
    id_asist int auto_increment
        primary key,
    id_user  int         null,
    time_in  varchar(25) null,
    time_out varchar(25) null,
    date     varchar(50) null,
    constraint asist_ibfk_1
        foreign key (id_user) references users (id)
);

create index id_user
    on asist (id_user);

