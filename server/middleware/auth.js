import jwt from 'jsonwebtoken';

// 认证中间件，用于保护需要登录的路由
const auth = (req, res, next) => {
  try {
    // 从请求头获取token
    const token = req.header('Authorization').replace('Bearer ', '');
    
    // 验证token
    const decoded = jwt.verify(token, 'your_jwt_secret_key'); // 建议使用环境变量存储密钥
    
    // 将用户信息存储到请求对象中
    req.user = decoded;
    
    // 继续处理请求
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: '认证失败，请重新登录' });
  }
};

export default auth;