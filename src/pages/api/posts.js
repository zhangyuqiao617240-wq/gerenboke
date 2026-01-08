export function GET() {
  const posts = [
    { id: 1, title: '动态博客文章1', content: '通过Astro SSR提供的动态数据' },
    { id: 2, title: '用户交互测试', content: '支持登录、评论等动态功能' }
  ];
  return Response.json({ posts });
}
