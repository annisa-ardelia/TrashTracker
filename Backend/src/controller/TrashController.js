const db = require('../db'); // Pastikan ini sesuai dengan konfigurasi database kamu

// Fungsi untuk mengambil jumlah sampah basah dan kering pada hari ini
const getTrashData = async (req, res) => {
    try {
        // Mengambil tanggal hari ini
        const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

        // Query untuk mendapatkan jumlah sampah basah dan kering hari ini
        const query = `
            SELECT jenis_sampah, jumlah_sampah
            FROM sampah
            WHERE tanggal = $1 AND (jenis_sampah = 'basah' OR jenis_sampah = 'kering')
            GROUP BY jenis_sampah;
        `;
        const result = await db.query(query, [today]);

        // Jika tidak ada data
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No trash data found for today' });
        }

        // Menyusun data untuk mengembalikan response
        const data = {
            basah: 0,
            kering: 0
        };

        result.rows.forEach(row => {
            if (row.jenis_sampah === 'basah') {
                data.basah = row.total;
            } else if (row.jenis_sampah === 'kering') {
                data.kering = row.total;
            }
        });

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

// Fungsi untuk mengambil jumlah sampah basah dan kering selama 10 hari terakhir
const getDailyTrashData = async (req, res) => {
    try {
        // Mengambil tanggal hari ini dan 10 hari sebelumnya
        const today = new Date();
        const last10Days = new Date();
        last10Days.setDate(today.getDate() - 10);

        // Format tanggal menjadi YYYY-MM-DD
        const todayFormatted = today.toISOString().split('T')[0];
        const last10DaysFormatted = last10Days.toISOString().split('T')[0];

        // Query untuk mendapatkan jumlah sampah basah dan kering dalam 10 hari terakhir
        const query = `
            SELECT tanggal, jenis_sampah, SUM(jumlah_sampah) AS total
            FROM sampah
            WHERE tanggal BETWEEN $1 AND $2 AND (jenis_sampah = 'basah' OR jenis_sampah = 'kering')
            GROUP BY tanggal, jenis_sampah
            ORDER BY tanggal DESC;
        `;
        const result = await db.query(query, [last10DaysFormatted, todayFormatted]);

        // Jika tidak ada data
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No trash data found for the last 10 days' });
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

module.exports = { getTrashData, getDailyTrashData };
