const db = require('../db'); // Pastikan ini sesuai dengan konfigurasi database kamu

// Fungsi untuk menambahkan tempat sampah
const addTempatSampah = async (req, res) => {
    const { nama, fakultas, latitude, longitude } = req.body;

    // Validasi input
    if (!nama || !fakultas || !latitude || !longitude) {
        return res.status(400).json({
            message: 'All fields (nama, fakultas, latitude, longitude) are required.',
        });
    }

    try {
        // Query untuk menambahkan tempat sampah baru
        const result = await db.query(
            `INSERT INTO tempat_sampah (nama, fakultas, latitude, longitude) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [nama, fakultas, latitude, longitude]
        );

        // Mengembalikan data tempat sampah yang ditambahkan
        res.status(201).json({
            message: 'Tempat sampah berhasil ditambahkan.',
            tempatSampah: result.rows[0],
        });
    } catch (error) {
        console.error('Error adding new trash location:', error.message);
        res.status(500).json({
            message: 'An error occurred while adding the trash location.',
        });
    }
};

// Fungsi untuk menghapus tempat sampah
const deleteTempatSampah = async (req, res) => {
    const { id } = req.params;

    try {
        // Query untuk menghapus tempat sampah berdasarkan id
        const result = await db.query('DELETE FROM tempat_sampah WHERE id = $1', [id]);

        // Jika tidak ada tempat sampah dengan id tersebut
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Tempat sampah tidak ditemukan.' });
        }

        res.status(200).json({ message: 'Tempat sampah berhasil dihapus.' });
    } catch (error) {
        console.error('Error deleting trash location:', error.message);
        res.status(500).json({
            message: 'An error occurred while deleting the trash location.',
        });
    }
};

// Fungsi untuk mengedit tempat sampah
const editTempatSampah = async (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL
    const { nama, fakultas, latitude, longitude } = req.body; // Data yang ingin diperbarui

    // Validasi input
    if (!id) {
        return res.status(400).json({
            message: 'Tempat sampah ID is required.',
        });
    }

    try {
        // Query untuk memperbarui tempat sampah berdasarkan ID
        const result = await db.query(
            `UPDATE tempat_sampah 
             SET nama = COALESCE($1, nama),
                 fakultas = COALESCE($2, fakultas),
                 latitude = COALESCE($3, latitude),
                 longitude = COALESCE($4, longitude)
             WHERE id = $5
             RETURNING *`,
            [nama, fakultas, latitude, longitude, id]
        );

        // Jika tidak ada baris yang diperbarui, berarti ID tidak ditemukan
        if (result.rowCount === 0) {
            return res.status(404).json({
                message: `No trash location found with ID ${id}.`,
            });
        }

        // Mengembalikan data tempat sampah yang diperbarui
        res.status(200).json({
            message: 'Tempat sampah berhasil diperbarui.',
            tempatSampah: result.rows[0],
        });
    } catch (error) {
        console.error('Error updating trash location:', error.message);
        res.status(500).json({
            message: 'An error occurred while updating the trash location.',
        });
    }
};

// Fungsi untuk mengambil data tempat sampah
const getTempatSampah = async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM tempat_sampah');
      const tempatSampah = result.rows;
  
      res.status(200).json(tempatSampah);
    } catch (error) {
      console.error('Error fetching tempat sampah:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Fungsi untuk mengambil jumlah sampah basah dan kering pada hari ini untuk tempat sampah berdasarkan id
const getTrashData = async (req, res) => {
    try {
        // Mendapatkan id tempat sampah dari parameter URL
        const { id } = req.params;

        // Mengambil tanggal hari ini
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

        // Query untuk mendapatkan jumlah sampah basah dan kering hari ini berdasarkan tempat sampah
        const query = `
            SELECT t.id AS tempat_sampah_id, t.nama AS tempat_sampah, s.jenis_sampah, SUM(s.jumlah_sampah) AS total
            FROM sampah s
            JOIN tempat_sampah t ON s.tempat_sampah_id = t.id
            WHERE t.id = $1 AND s.tanggal = $2 AND (s.jenis_sampah = 'basah' OR s.jenis_sampah = 'kering')
            GROUP BY t.id, t.nama, s.jenis_sampah
            ORDER BY s.jenis_sampah;
        `;
        const result = await db.query(query, [id, today]);

        // Jika tidak ada data
        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Belum ada sampah hari ini` });
        }

        // Menyusun data untuk mengembalikan response
        const data = result.rows.reduce((acc, row) => {
            if (row.jenis_sampah === 'basah') {
                acc.basah = row.total;
            } else if (row.jenis_sampah === 'kering') {
                acc.kering = row.total;
            }
            return acc;
        }, { basah: 0, kering: 0 });

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

// Fungsi untuk mengambil jumlah sampah basah dan kering selama 10 hari terakhir berdasarkan tempat sampah
const getDailyTrashData = async (req, res) => {
    try {
        // Mendapatkan id tempat sampah dari parameter URL
        const { id } = req.params;

        // Mengambil tanggal hari ini dan 10 hari sebelumnya
        const today = new Date();
        const last10Days = new Date();
        last10Days.setDate(today.getDate() - 10);

        // Format tanggal menjadi YYYY-MM-DD
        const todayFormatted = today.toISOString().split('T')[0];
        const last10DaysFormatted = last10Days.toISOString().split('T')[0];

        // Query untuk mendapatkan jumlah sampah basah dan kering dalam 10 hari terakhir berdasarkan tempat sampah
        const query = `
            SELECT t.id AS tempat_sampah_id, t.nama AS tempat_sampah, s.tanggal, s.jenis_sampah, SUM(s.jumlah_sampah) AS total
            FROM sampah s
            JOIN tempat_sampah t ON s.tempat_sampah_id = t.id
            WHERE t.id = $1 AND s.tanggal BETWEEN $2 AND $3 AND (s.jenis_sampah = 'basah' OR s.jenis_sampah = 'kering')
            GROUP BY t.id, t.nama, s.tanggal, s.jenis_sampah
            ORDER BY s.tanggal DESC, s.jenis_sampah;
        `;
        const result = await db.query(query, [id, last10DaysFormatted, todayFormatted]);

        // Jika tidak ada data
        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Belum ada sampah 10 hari terakhir` });
        }

        // Menyusun data untuk mengembalikan response
        const data = result.rows.reduce((acc, row) => {
            const date = row.tanggal;
            if (!acc[date]) {
                acc[date] = { basah: 0, kering: 0 };
            }
            if (row.jenis_sampah === 'basah') {
                acc[date].basah = row.total;
            } else if (row.jenis_sampah === 'kering') {
                acc[date].kering = row.total;
            }
            return acc;
        }, {});

        // Menyusun data agar urutan tanggalnya berurutan dari yang terbaru
        const sortedData = Object.keys(data)
            .sort((a, b) => new Date(b) - new Date(a))
            .map(date => ({
                date,
                basah: data[date].basah,
                kering: data[date].kering
            }));

        res.status(200).json(sortedData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

const addDataSampah = async (req, res) => {
    const { tanggal, jenis_sampah, jumlah_sampah, tempat_sampah_id } = req.body;

    // Validasi input
    if (!tempat_sampah_id || !jenis_sampah || !jumlah_sampah || !tanggal) {
        return res.status(400).json({
            message: 'All fields (tanggal, jenis_sampah, jumlah_sampah, tempat_sampah_id) are required.',
        });
    }

    try {
        // Query untuk menambahkan data sampah baru
        const result = await db.query(
            `INSERT INTO sampah (tanggal, jenis_sampah, jumlah_sampah, tempat_sampah_id) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [tanggal, jenis_sampah, jumlah_sampah, tempat_sampah_id]
        );

        // Mengembalikan data sampah yang ditambahkan
        res.status(201).json({
            message: 'Data sampah berhasil ditambahkan.',
            sampah: result.rows[0],
        });
    } catch (error) {
        console.error('Error adding new trash data:', error.message);
        res.status(500).json({
            message: 'An error occurred while adding the trash data.',
        });
    }
};

module.exports = { addTempatSampah, deleteTempatSampah, editTempatSampah, getTempatSampah, getTrashData, getDailyTrashData, addDataSampah };
