const express = require('express');
const cors = require('cors');
const bp = require('body-parser');
// const jwt = require('jsonwebtoken');

const Routes = require('./src/routes');
const db = require('./src/db');//mundur 2 kali

const app = express();
const port = 3001;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());
app.options("*", cors());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

db.connect((err) => {
    if (err) {
      console.error("Error connecting to database", err);
      return;
    }
    console.log("Database connected");
});

app.use('/', Routes);