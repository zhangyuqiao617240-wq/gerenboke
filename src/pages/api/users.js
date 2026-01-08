export async function POST(request) {
  const url = new URL(request.url);
  const action = url.pathname.split('/').pop(); // login 或 register
  const data = await request.json();
  
  if (action === 'login') {
    // 模拟登录
    return Response.json({
      success: true,
      message: '登录成功',
      token: 'mock-jwt-token',
      user: {
        id: 1,
        username: data.username || '用户',
        email: 'user@example.com'
      }
    });
  }
  
  if (action === 'register') {
    // 模拟注册
    return Response.json({
      success: true,
      message: '注册成功',
      user_id: Date.now()
    });
  }
  
  return Response.json({ error: '未知操作' }, { status: 400 });
}
