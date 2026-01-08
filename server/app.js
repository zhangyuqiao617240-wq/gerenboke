import express from 'express';
import cors from 'cors';
import pool from './db/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 测试数据库连接
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 + 1 AS result');
    res.json({ success: true, message: '数据库连接成功', result: rows[0].result });
  } catch (error) {
    console.error('数据库连接失败:', error);
    res.status(500).json({ success: false, message: '数据库连接失败', error: error.message });
  }
});

// 路由配置
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});