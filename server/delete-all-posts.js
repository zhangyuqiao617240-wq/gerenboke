import pool from './db/db.js';

async function deleteAllPosts() {
  try {
    // 删除所有文章
    const [result] = await pool.execute('DELETE FROM posts');
    console.log(`成功删除了 ${result.affectedRows} 篇文章`);
    process.exit(0);
  } catch (error) {
    console.error('删除文章失败:', error);
    process.exit(1);
  }
}

deleteAllPosts();