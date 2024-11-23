
-- table akun
CREATE TABLE admin (    
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pass char(64) NOT NULL
);

-- table sampah
CREATE TABLE sampah (
    id serial PRIMARY KEY,
    tanggal date NOT NULL, -- format: YYYY-MM-DD
    jenis_sampah varchar(255) NOT NULL, -- basah/kering
    jumlah_sampah integer NOT NULL,
);