-- CREATE DATABASE frag-ments;

CREATE TABLE cms(
    id SERIAL PRIMARY KEY,
    date varchar(255), 
    movie varchar(255),
    short varchar(255),
    tv_series varchar(255),
    book varchar(255),
    play varchar(255),
    short_story varchar(255)
);

INSERT INTO cms (date, movie, short) VALUES ($1,$2, $3);