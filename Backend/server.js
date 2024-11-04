const express = require('express');
const { pool } = require('./config.js');
const cors = require('cors');

const bodyParser = require('body-parser');
const port = process.env.PORT;
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

pool.connect(() => {
    console.log("Connected to database");
});

app.listen(port, () => {
    console.log('Server is running and listening on port', port);
});