
-- table akun
CREATE TABLE admin (    
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pass char(64) NOT NULL
);