import mysql from 'mysql2/promise';

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root', // 数据库用户名
  password: '123456', // 数据库密码
  database: 'gerenboke', // 数据库名
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;