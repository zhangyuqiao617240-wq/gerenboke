import pool from '../db/db.js';

// 获取文章列表
export const getPosts = async (req, res) => {
  try {
    // 获取文章列表，包含作者信息
    const [posts] = await pool.execute(
      `SELECT p.*, u.username AS author_name 
       FROM posts p 
       JOIN users u ON p.author_id = u.user_id 
       ORDER BY p.created_at DESC`
    );
    
    res.json({ success: true, data: posts });
  } catch (error) {
    console.error('获取文章列表失败:', error);
    res.status(500).json({ success: false, message: '获取文章列表失败' });
  }
};

// 获取单篇文章
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 获取文章详情，包含作者信息
    const [posts] = await pool.execute(
      `SELECT p.*, u.username AS author_name 
       FROM posts p 
       JOIN users u ON p.author_id = u.user_id 
       WHERE p.post_id = ?`,
      [id]
    );
    
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    
    res.json({ success: true, data: posts[0] });
  } catch (error) {
    console.error('获取文章详情失败:', error);
    res.status(500).json({ success: false, message: '获取文章详情失败' });
  }
};

// 创建文章
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { user_id } = req.user;
    
    // 创建文章
    const [result] = await pool.execute(
      'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
      [title, content, user_id]
    );
    
    // 获取刚创建的文章详情
    const [posts] = await pool.execute(
      `SELECT p.*, u.username AS author_name 
       FROM posts p 
       JOIN users u ON p.author_id = u.user_id 
       WHERE p.post_id = ?`,
      [result.insertId]
    );
    
    res.status(201).json({ success: true, message: '文章发布成功', data: posts[0] });
  } catch (error) {
    console.error('发布文章失败:', error);
    res.status(500).json({ success: false, message: '发布文章失败' });
  }
};

// 更新文章
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { user_id } = req.user;
    
    // 检查文章是否存在
    const [posts] = await pool.execute('SELECT * FROM posts WHERE post_id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    
    const post = posts[0];
    
    // 移除权限检查，允许所有人修改文章
    // if (parseInt(post.author_id) !== parseInt(user_id)) {
    //   return res.status(403).json({ success: false, message: '无权修改该文章' });
    // }
    
    // 更新文章
    await pool.execute(
      'UPDATE posts SET title = ?, content = ? WHERE post_id = ?',
      [title, content, id]
    );
    
    // 获取更新后的文章详情
    const [updatedPosts] = await pool.execute(
      `SELECT p.*, u.username AS author_name 
       FROM posts p 
       JOIN users u ON p.author_id = u.user_id 
       WHERE p.post_id = ?`,
      [id]
    );
    
    res.json({ success: true, message: '文章更新成功', data: updatedPosts[0] });
  } catch (error) {
    console.error('更新文章失败:', error);
    res.status(500).json({ success: false, message: '更新文章失败' });
  }
};

// 删除文章
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    
    // 检查文章是否存在
    const [posts] = await pool.execute('SELECT * FROM posts WHERE post_id = ?', [id]);
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    
    const post = posts[0];
    
    // 移除权限检查，允许所有人删除文章
    // if (parseInt(post.author_id) !== parseInt(user_id)) {
    //   return res.status(403).json({ success: false, message: '无权删除该文章' });
    // }
    
    // 删除文章
    await pool.execute('DELETE FROM posts WHERE post_id = ?', [id]);
    
    res.json({ success: true, message: '文章删除成功' });
  } catch (error) {
    console.error('删除文章失败:', error);
    res.status(500).json({ success: false, message: '删除文章失败' });
  }
};

// 获取用户发布的文章
export const getUserPosts = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // 获取指定用户的文章列表
    const [posts] = await pool.execute(
      `SELECT p.*, u.username AS author_name 
       FROM posts p 
       JOIN users u ON p.author_id = u.user_id 
       WHERE p.author_id = ? 
       ORDER BY p.created_at DESC`,
      [user_id]
    );
    
    res.json({ success: true, data: posts });
  } catch (error) {
    console.error('获取用户文章失败:', error);
    res.status(500).json({ success: false, message: '获取用户文章失败' });
  }
};