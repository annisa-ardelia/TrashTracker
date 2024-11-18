const db = require('../db');//mundur 2 kali
const bcrypt = require('bcrypt');
    
//Cek Database
const Cek = async (req, res) => {
    try {
        // Lakukan query ke database untuk mendapatkan data tertentu
        const result = await db.query("SELECT * FROM admin");

        // Kirim data sebagai respons dalam format JSON
        res.status(200).json({ data: result.rows });
    } catch (error) {
        console.error('Error fetching data from database:', error);
        res.status(500).json({ error: 'Failed to fetch data from database' });
    }
};

//Register Admin
const Register = async (req, res) => {
    const { username, pass } = req.body;
  
    try {
      // Check if the username already exists in the database
      const query = "SELECT * FROM admin WHERE username = $1";
      const result = await db.query(query, [username]);
  
      if (result.rows.length > 0) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      // Hash the password using bcrypt
      console.log(pass);
      const hashedPassword = await bcrypt.hash(pass, 10);
  
      // Insert the admin information into the database
      const insertQuery = 'INSERT INTO admin (username, pass) VALUES ($1, $2)';
      await db.query(insertQuery, [username, hashedPassword]);
  
      res.status(200).json({ message: 'Admin registered successfully' });
    } catch (error) {
      console.error('Error registering admin:', error);
      res.status(500).json({ error: 'Failed to register admin' });
    }
};

const Login = async (req, res) => {
    const { username, pass } = req.body;
    
    db.query(
      `SELECT * FROM admin WHERE username = '${username}'`,
      async (err, result) => {
        if (result.rows.length === 0) {
          return res.status(401).json({ error: "Invalid username or password" });
        }
        if (err) {
          console.error("Error executing query", err);
          return;
        }
        const storedData = result.rows[0];
        const passwordMatch = await bcrypt.compare(pass, storedData.pass.trim());
  
        if (passwordMatch) {
          return res.status(200).json({ message: 'Login successful' });
        } else {
          // Password does not match
          console.log(storedData);
          return res.status(401).json({ error: 'Invalid username or password' });
        }
      }
    );
};


module.exports = { Cek, Register, Login };