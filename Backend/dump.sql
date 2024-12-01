
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
-- untuk tempat sampah
INSERT INTO tempat_sampah (nama, fakultas, latitude, longitude)
VALUES
('Tempat Sampah Teknik', 'Teknik', -6.891, 107.610),
('Tempat Sampah Ekonomi', 'Ekonomi', -6.890, 107.611),
('Tempat Sampah FISIP', 'FISIP', -6.892, 107.609),
('Tempat Sampah Kedokteran', 'Kedokteran', -6.893, 107.608);

-- untuk data sampah
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



--Tabel di database local
CREATE TABLE `sensor_db`.`sensor_dataa` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `distanceWet` FLOAT NOT NULL , 
    `distanceDry` FLOAT NOT NULL , 
    `percentageWet` FLOAT NOT NULL , 
    `percentageDry` FLOAT NOT NULL , 
    `timestamp` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;

INSERT INTO sampah (id, tanggal, jenis_sampah, jumlah_sampah, tempat_sampah_id) VALUES
(19, '2024-11-20', 'kering', 10, 2),
(20, '2024-11-20', 'basah', 15, 2),
(21, '2024-11-21', 'kering', 8, 2),
(22, '2024-11-21', 'basah', 20, 2),
(23, '2024-11-22', 'kering', 12, 2),
(24, '2024-11-22', 'basah', 25, 2),
(25, '2024-11-23', 'kering', 10, 2),
(26, '2024-11-23', 'basah', 15, 2),
(27, '2024-11-24', 'kering', 8, 2),
(28, '2024-11-24', 'basah', 20, 2),
(29, '2024-11-25', 'kering', 12, 2),
(30, '2024-11-25', 'basah', 25, 2),
(31, '2024-11-20', 'kering', 10, 3),
(32, '2024-11-20', 'basah', 15, 3),
(33, '2024-11-21', 'kering', 8, 3),
(34, '2024-11-21', 'basah', 20, 3),
(35, '2024-11-22', 'kering', 12, 3),
(36, '2024-11-22', 'basah', 25, 3),
(37, '2024-11-23', 'kering', 10, 3),
(38, '2024-11-23', 'basah', 15, 3),
(39, '2024-11-24', 'kering', 8, 3),
(40, '2024-11-24', 'basah', 20, 3),
(41, '2024-11-25', 'kering', 12, 3),
(42, '2024-11-25', 'basah', 25, 3),
(43, '2024-11-20', 'kering', 10, 4),
(44, '2024-11-20', 'basah', 15, 4),
(45, '2024-11-21', 'kering', 8, 4),
(46, '2024-11-21', 'basah', 20, 4),
(47, '2024-11-22', 'kering', 12, 4),
(48, '2024-11-22', 'basah', 25, 4),
(49, '2024-11-23', 'kering', 10, 4),
(50, '2024-11-23', 'basah', 15, 4),
(51, '2024-11-24', 'kering', 8, 4),
(52, '2024-11-24', 'basah', 20, 4),
(53, '2024-11-25', 'kering', 12, 4),
(54, '2024-11-25', 'basah', 25, 4),
(55, '2024-11-20', 'kering', 10, 5),
(56, '2024-11-20', 'basah', 15, 5),
(57, '2024-11-21', 'kering', 8, 5),
(58, '2024-11-21', 'basah', 20, 5),
(59, '2024-11-22', 'kering', 12, 5),
(60, '2024-11-22', 'basah', 25, 5),
(61, '2024-11-23', 'kering', 10, 5),
(62, '2024-11-23', 'basah', 15, 5),
(63, '2024-11-24', 'kering', 8, 5),
(64, '2024-11-24', 'basah', 20, 5),
(65, '2024-11-25', 'kering', 12, 5),
(66, '2024-11-25', 'basah', 25, 5),
(67, '2024-11-20', 'kering', 10, 6),
(68, '2024-11-20', 'basah', 15, 6),
(69, '2024-11-21', 'kering', 8, 6),
(70, '2024-11-21', 'basah', 20, 6),
(71, '2024-11-22', 'kering', 12, 6),
(72, '2024-11-22', 'basah', 25, 6),
(73, '2024-11-23', 'kering', 10, 6),
(74, '2024-11-23', 'basah', 15, 6),
(75, '2024-11-24', 'kering', 8, 6),
(76, '2024-11-24', 'basah', 20, 6),
(77, '2024-11-25', 'kering', 12, 6),
(78, '2024-11-25', 'basah', 25, 6);

INSERT INTO sampah (id, tanggal, jenis_sampah, jumlah_sampah, tempat_sampah_id) VALUES
(79, '2024-12-1', 'kering', 23, 2),
(80, '2024-12-1', 'basah', 42, 2),
(81, '2024-12-2', 'kering', 58, 2),
(82, '2024-12-2', 'basah', 31, 2),
(83, '2024-12-1', 'kering', 17, 3),
(84, '2024-12-1', 'basah', 54, 3),
(85, '2024-12-2', 'kering', 22, 3),
(86, '2024-12-2', 'basah', 49, 3),
(87, '2024-12-1', 'kering', 38, 4),
(88, '2024-12-1', 'basah', 27, 4),
(89, '2024-12-2', 'kering', 53, 4),
(90, '2024-12-2', 'basah', 46, 4),
(91, '2024-12-1', 'kering', 59, 5),
(92, '2024-12-1', 'basah', 34, 5),
(93, '2024-12-2', 'kering', 28, 5),
(94, '2024-12-2', 'basah', 51, 5),
(95, '2024-12-1', 'kering', 19, 6),
(96, '2024-12-1', 'basah', 33, 6),
(97, '2024-12-2', 'kering', 45, 6),
(98, '2024-12-2', 'basah', 57, 6),
(99, '2024-12-1', 'kering', 48, 1),
(100, '2024-12-1', 'basah', 26, 1),
(101, '2024-12-2', 'kering', 37, 1),
(102, '2024-12-2', 'basah', 13, 1);