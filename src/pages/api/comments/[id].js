export async function DELETE(context) {
  const { id } = context.params;
  
  return Response.json({
    success: true,
    message: `评论 ${id} 删除成功`
  });
}
