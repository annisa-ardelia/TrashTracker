
-- table akun
CREATE TABLE admin (    
    id serial PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    pass char(64) NOT NULL
);

-- Tabel tempat_sampah (sudah ada)
CREATE TABLE tempat_sampah (
    id serial PRIMARY KEY,
    nama varchar(255) NOT NULL,
    fakultas varchar(255) NOT NULL,
    latitude double precision NOT NULL,
    longitude double precision NOT NULL
);

-- Tabel sampah dengan kolom tempat_sampah_id sebagai foreign key
CREATE TABLE sampah (
    id serial PRIMARY KEY,
    tanggal date NOT NULL, 
    jenis_sampah varchar(255) NOT NULL, -- basah/kering
    jumlah_sampah integer NOT NULL,
    tempat_sampah_id integer, -- foreign key yang menghubungkan ke tabel tempat_sampah
    CONSTRAINT fk_tempat_sampah
        FOREIGN KEY (tempat_sampah_id)
        REFERENCES tempat_sampah(id)
        ON DELETE CASCADE -- Jika data tempat sampah dihapus, maka data sampah terkait juga dihapus
);

-- Dummy data
INSERT INTO tempat_sampah (nama, fakultas, latitude, longitude)
VALUES
('Tempat Sampah Teknik', 'Teknik', -6.891, 107.610),
('Tempat Sampah Ekonomi', 'Ekonomi', -6.890, 107.611),
('Tempat Sampah FISIP', 'FISIP', -6.892, 107.609),
('Tempat Sampah Kedokteran', 'Kedokteran', -6.893, 107.608);

INSERT INTO sampah (tanggal, jenis_sampah, jumlah_sampah, tempat_sampah_id)
VALUES
('2024-11-20', 'basah', 15, 1),
('2024-11-20', 'kering', 10, 1),
('2024-11-21', 'basah', 20, 1),
('2024-11-21', 'kering', 5, 1),

('2024-11-20', 'basah', 12, 2),
('2024-11-20', 'kering', 8, 2),
('2024-11-21', 'basah', 18, 2),
('2024-11-21', 'kering', 10, 2),

('2024-11-20', 'basah', 10, 3),
('2024-11-20', 'kering', 7, 3),
('2024-11-21', 'basah', 15, 3),
('2024-11-21', 'kering', 5, 3),

('2024-11-20', 'basah', 22, 4),
('2024-11-20', 'kering', 18, 4),
('2024-11-21', 'basah', 25, 4),
('2024-11-21', 'kering', 15, 4);
