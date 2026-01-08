# 个人博客网站

一个基于Astro + Node.js + MySQL的个人博客网站，支持文章的发布、编辑、删除和浏览功能。

## 技术栈

### 前端
- Astro框架
- HTML + CSS + JavaScript
- 响应式设计

### 后端
- Node.js + Express
- MySQL数据库
- JWT认证

## 功能特性

- ✅ 文章列表展示（仅显示数据库中存在的文章）
- ✅ 文章详情查看
- ✅ 文章发布功能
- ✅ 文章编辑功能
- ✅ 文章删除功能
- ✅ 用户注册和登录
- ✅ 评论功能（待完善）

## 数据流程

所有文章数据均从数据库动态获取，不使用本地存储：

1. 页面加载时，前端通过fetch API调用后端接口
2. 后端从MySQL数据库查询文章数据
3. 后端返回JSON格式的文章数据
4. 前端渲染文章内容
5. 不存在的文章ID会显示404页面

## 开发说明

### 前端开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 后端开发

```bash
# 进入后端目录
cd server

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 数据库设计

### 表结构

#### users表
- user_id (主键)
- username
- email
- password
- created_at

#### posts表
- post_id (主键)
- title
- content
- author_id (外键，关联users表)
- created_at
- updated_at

#### comments表
- comment_id (主键)
- post_id (外键，关联posts表)
- author_id (外键，关联users表)
- content
- created_at

## 注意事项

1. 网站只会显示数据库中实际存在的文章
2. 访问不存在的文章ID会显示404页面
3. 未登录用户无法发布、编辑或删除文章
4. 只有文章作者才能编辑或删除自己的文章
5. 用户认证信息使用JWT存储在localStorage中

## 许可证

MIT License