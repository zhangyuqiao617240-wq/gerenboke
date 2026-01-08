import mysql from 'mysql2/promise';

// 创建数据库连接
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'gerenboke',
});

try {
  console.log('检查数据库中的文章...');
  
  // 查询所有文章
  const [posts] = await connection.query('SELECT post_id, title FROM posts ORDER BY post_id ASC');
  
  if (posts.length === 0) {
    console.log('数据库中没有文章');
  } else {
    console.log(`找到 ${posts.length} 篇文章:`);
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ID: ${post.post_id}, 标题: ${post.title}`);
    });
  }
} catch (error) {
  console.error('检查文章失败:', error);
} finally {
  // 关闭连接
  await connection.end();
}
