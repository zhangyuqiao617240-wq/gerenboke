import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
    output: 'server',  // 关键！服务端渲染
    adapter: vercel()
});
