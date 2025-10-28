import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    port: 3330, // Puerto de MySQL
    user: 'root',
    password: 'MySql@2025',
    database: 'BankApp',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;