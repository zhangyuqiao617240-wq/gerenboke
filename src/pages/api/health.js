export function GET() {
  return Response.json({
    status: 'ok',
    message: 'Astro SSR API 动态路由',
    timestamp: new Date().toISOString()
  });
}
