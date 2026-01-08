import pool from '../db/db.js';

// 获取文章评论
export const getCommentsByPostId = async (req, res) => {
  try {
    const { post_id } = req.params;
    
    // 获取文章评论，包含评论者信息
    const [comments] = await pool.execute(
      `SELECT c.*, u.username AS author_name 
       FROM comments c 
       JOIN users u ON c.author_id = u.user_id 
       WHERE c.post_id = ? 
       ORDER BY c.created_at DESC`,
      [post_id]
    );
    
    res.json({ success: true, data: comments });
  } catch (error) {
    console.error('获取评论失败:', error);
    res.status(500).json({ success: false, message: '获取评论失败' });
  }
};

// 创建评论
export const createComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const { user_id } = req.user;
    
    // 检查文章是否存在
    const [posts] = await pool.execute('SELECT * FROM posts WHERE post_id = ?', [post_id]);
    if (posts.length === 0) {
      return res.status(404).json({ success: false, message: '文章不存在' });
    }
    
    // 创建评论
    const [result] = await pool.execute(
      'INSERT INTO comments (content, author_id, post_id) VALUES (?, ?, ?)',
      [content, user_id, post_id]
    );
    
    // 获取刚创建的评论详情
    const [comments] = await pool.execute(
      `SELECT c.*, u.username AS author_name 
       FROM comments c 
       JOIN users u ON c.author_id = u.user_id 
       WHERE c.comment_id = ?`,
      [result.insertId]
    );
    
    res.status(201).json({ success: true, message: '评论发布成功', data: comments[0] });
  } catch (error) {
    console.error('发布评论失败:', error);
    res.status(500).json({ success: false, message: '发布评论失败' });
  }
};

// 删除评论
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    
    // 检查评论是否存在
    const [comments] = await pool.execute('SELECT * FROM comments WHERE comment_id = ?', [id]);
    if (comments.length === 0) {
      return res.status(404).json({ success: false, message: '评论不存在' });
    }
    
    const comment = comments[0];
    
    // 移除权限检查，允许所有人删除评论
    // if (parseInt(comment.author_id) !== parseInt(user_id)) {
    //   return res.status(403).json({ success: false, message: '无权删除该评论' });
    // }
    
    // 删除评论
    await pool.execute('DELETE FROM comments WHERE comment_id = ?', [id]);
    
    res.json({ success: true, message: '评论删除成功' });
  } catch (error) {
    console.error('删除评论失败:', error);
    res.status(500).json({ success: false, message: '删除评论失败' });
  }
};

// 获取用户的评论
export const getUserComments = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // 获取用户的所有评论
    const [comments] = await pool.execute(
      `SELECT c.*, u.username AS author_name, p.title AS post_title 
       FROM comments c 
       JOIN users u ON c.author_id = u.user_id 
       JOIN posts p ON c.post_id = p.post_id 
       WHERE c.author_id = ? 
       ORDER BY c.created_at DESC`,
      [user_id]
    );
    
    res.json({ success: true, data: comments });
  } catch (error) {
    console.error('获取用户评论失败:', error);
    res.status(500).json({ success: false, message: '获取用户评论失败' });
  }
};