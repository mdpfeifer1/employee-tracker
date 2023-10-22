const expresss = require('express');
const mysql = require ('mysql2');

const PORT = process.env.PORT || 3001; 
const app = express();

app.use(express.urlencoded ({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password-1',
    database: ''
},
    console.log('Connected')
);

// Create Employee Route

// Read all Employees Route

// Delete Employee

// List data of employees

// Default response 
app.us((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});