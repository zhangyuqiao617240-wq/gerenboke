import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db/db.js';

// 用户注册
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // 检查邮箱是否已存在
    const [existingUser] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ success: false, message: '该邮箱已被注册' });
    }
    
    // 检查用户名是否已存在
    const [existingUsername] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUsername.length > 0) {
      return res.status(400).json({ success: false, message: '该用户名已被使用' });
    }
    
    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    
    // 创建用户
    const [result] = await pool.execute(
      'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
      [username, email, passwordHash]
    );
    
    res.status(201).json({ success: true, message: '注册成功' });
  } catch (error) {
    console.error('注册失败:', error);
    res.status(500).json({ success: false, message: '注册失败，请稍后重试' });
  }
};

// 用户登录
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 检查用户是否存在
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: '邮箱或密码错误' });
    }
    
    const user = users[0];
    
    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: '邮箱或密码错误' });
    }
    
    // 生成JWT令牌
    const token = jwt.sign(
      { user_id: user.user_id, username: user.username, email: user.email },
      'your_jwt_secret_key', // 建议使用环境变量存储密钥
      { expiresIn: '7d' } // 令牌有效期7天
    );
    
    res.json({ 
      success: true, 
      message: '登录成功', 
      data: { 
        token, 
        user: { 
          user_id: user.user_id, 
          username: user.username, 
          email: user.email 
        } 
      } 
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ success: false, message: '登录失败，请稍后重试' });
  }
};

// 获取当前用户信息
export const getCurrentUser = async (req, res) => {
  try {
    const { user_id } = req.user;
    
    const [users] = await pool.execute('SELECT user_id, username, email, created_at FROM users WHERE user_id = ?', [user_id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }
    
    res.json({ success: true, data: users[0] });
  } catch (error) {
    console.error('获取用户信息失败:', error);
    res.status(500).json({ success: false, message: '获取用户信息失败' });
  }
};

// 更新用户信息
export const updateUser = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { username, email } = req.body;
    
    // 检查邮箱是否已被其他用户使用
    const [existingEmails] = await pool.execute('SELECT * FROM users WHERE email = ? AND user_id != ?', [email, user_id]);
    if (existingEmails.length > 0) {
      return res.status(400).json({ success: false, message: '该邮箱已被其他用户使用' });
    }
    
    // 检查用户名是否已被其他用户使用
    const [existingUsernames] = await pool.execute('SELECT * FROM users WHERE username = ? AND user_id != ?', [username, user_id]);
    if (existingUsernames.length > 0) {
      return res.status(400).json({ success: false, message: '该用户名已被其他用户使用' });
    }
    
    // 更新用户信息
    await pool.execute(
      'UPDATE users SET username = ?, email = ? WHERE user_id = ?',
      [username, email, user_id]
    );
    
    // 获取更新后的用户信息
    const [users] = await pool.execute('SELECT user_id, username, email, created_at FROM users WHERE user_id = ?', [user_id]);
    
    res.json({ success: true, message: '用户信息更新成功', data: users[0] });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({ success: false, message: '更新用户信息失败' });
  }
};

// 更改密码
export const changePassword = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { oldPassword, newPassword } = req.body;
    
    // 获取当前用户
    const [users] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [user_id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }
    
    const user = users[0];
    
    // 验证旧密码
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: '旧密码错误' });
    }
    
    // 加密新密码
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);
    
    // 更新密码
    await pool.execute(
      'UPDATE users SET password_hash = ? WHERE user_id = ?',
      [newPasswordHash, user_id]
    );
    
    res.json({ success: true, message: '密码更改成功' });
  } catch (error) {
    console.error('更改密码失败:', error);
    res.status(500).json({ success: false, message: '更改密码失败' });
  }
};