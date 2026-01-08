export function GET(context) {
  const { id } = context.params;
  
  const posts = {
    1: {
      post_id: 1,
      title: '动态博客文章1',
      content: '通过Astro SSR提供的动态数据',
      created_at: new Date().toISOString(),
      author: 'Admin'
    },
    2: {
      post_id: 2,
      title: '用户交互测试',
      content: '支持登录、评论等动态功能',
      created_at: new Date().toISOString(),
      author: 'Admin'
    }
  };
  
  const post = posts[id] || null;
  return Response.json({ post });
}

export async function PUT(context) {
  const { id } = context.params;
  const data = await context.request.json();
  
  return Response.json({
    success: true,
    message: `文章 ${id} 更新成功`,
    data
  });
}

export async function DELETE(context) {
  const { id } = context.params;
  
  return Response.json({
    success: true,
    message: `文章 ${id} 删除成功`
  });
}
