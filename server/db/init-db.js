import mysql from 'mysql2/promise';

// 创建数据库连接（不指定数据库）
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
});

let connectionWithDb = null;

try {
  // 检查数据库是否存在
  const [databases] = await connection.query(
    `SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = 'gerenboke'`
  );
  
  // 如果数据库不存在，则创建
  if (databases.length === 0) {
    console.log('创建数据库 gerenboke...');
    await connection.query(
      `CREATE DATABASE gerenboke CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log('数据库创建成功');
  }
  
  // 关闭当前连接，使用带数据库名的新连接
  await connection.end();
  
  // 创建带数据库名的连接
  connectionWithDb = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gerenboke'
  });
  
  // 创建用户表
  console.log('创建 users 表...');
  await connectionWithDb.query(`
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  
  // 创建文章表
  console.log('创建 posts 表...');
  await connectionWithDb.query(`
    CREATE TABLE IF NOT EXISTS posts (
        post_id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        author_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE
    )
  `);
  
  // 创建评论表
  console.log('创建 comments 表...');
  await connectionWithDb.query(`
    CREATE TABLE IF NOT EXISTS comments (
        comment_id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        author_id INT NOT NULL,
        post_id INT NOT NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
    )
  `);
  
  // 创建索引（MySQL 5.7不支持IF NOT EXISTS语法）
  console.log('创建索引...');
  try {
    await connectionWithDb.query(`CREATE INDEX idx_posts_author_id ON posts(author_id)`);
  } catch (e) {
    console.log('索引 idx_posts_author_id 已存在，跳过');
  }
  try {
    await connectionWithDb.query(`CREATE INDEX idx_posts_created_at ON posts(created_at)`);
  } catch (e) {
    console.log('索引 idx_posts_created_at 已存在，跳过');
  }
  try {
    await connectionWithDb.query(`CREATE INDEX idx_comments_post_id ON comments(post_id)`);
  } catch (e) {
    console.log('索引 idx_comments_post_id 已存在，跳过');
  }
  try {
    await connectionWithDb.query(`CREATE INDEX idx_comments_author_id ON comments(author_id)`);
  } catch (e) {
    console.log('索引 idx_comments_author_id 已存在，跳过');
  }
  
  console.log('数据库初始化完成！');
} catch (error) {
  console.error('数据库初始化失败:', error);
} finally {
  // 关闭连接
  if (connection && connection.state !== 'disconnected') {
    await connection.end();
  }
  if (connectionWithDb && connectionWithDb.state !== 'disconnected') {
    await connectionWithDb.end();
  }
}