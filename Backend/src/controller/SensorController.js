const db = require('../database/sensor_db'); // Import the database connection pool

// Get All Sensor Data
const getAllSensors = async (req, res) => {
    const query = 'SELECT * FROM sensor_dataa ORDER BY timestamp ASC LIMIT 5';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching all data from local database:', err);
            return res.status(500).json({ error: 'Failed to fetch all sensor data' });
        }
        res.status(200).json({ data: results });
    });
};

// Get Latest Sensor Data
const getLatestSensor = async (req, res) => {
    const query = 'SELECT * FROM sensor_dataa ORDER BY timestamp DESC LIMIT 1';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching the latest data from local database:', err);
            return res.status(500).json({ error: 'Failed to fetch the latest sensor data' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No sensor data available' });
        }
        res.status(200).json({ data: results[0] });
    });
};

module.exports = { getAllSensors, getLatestSensor };