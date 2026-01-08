export function GET(request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/');
  
  // 如果是 /api/comments/post/1 格式
  if (pathSegments.includes('post')) {
    const postId = pathSegments[pathSegments.length - 1];
    
    const comments = [
      {
        comment_id: 1,
        post_id: parseInt(postId),
        content: '这是测试评论',
        created_at: new Date().toISOString(),
        author: '访客'
      }
    ];
    
    return Response.json({ comments });
  }
  
  // 默认返回空
  return Response.json({ comments: [] });
}

export async function POST(request) {
  const data = await request.json();
  return Response.json({ 
    success: true, 
    message: '评论提交成功',
    comment_id: Date.now()
  });
}
