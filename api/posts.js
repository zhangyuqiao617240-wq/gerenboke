export default function handler(req, res) {
  res.status(200).json({
    posts: [
      { id: 1, title: '动态博客测试', content: 'Serverless函数正常工作' },
      { id: 2, title: 'Vercel部署', content: '全栈应用运行中' }
    ]
  });
}
