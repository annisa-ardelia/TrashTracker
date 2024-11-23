const db = require('../db'); // Pastikan ini sesuai dengan konfigurasi database kamu

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
            return res.status(404).json({ message: `No trash data found for place with id ${id} today` });
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
            return res.status(404).json({ message: `No trash data found for place with id ${id} in the last 10 days` });
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

module.exports = { getTempatSampah, getTrashData, getDailyTrashData };
