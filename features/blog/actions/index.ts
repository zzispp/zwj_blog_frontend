// 博客管理相关的 Server Actions 已全部迁移到后端 API
// 
// 对应的后端接口映射：
// - isBlogExistByID -> GET /api/blogs/{id}/exists
// - getBlogs -> POST /api/blogs/list  
// - getPublishedBlogs -> GET /api/blogs/published
// - getBlogByID -> GET /api/blogs/{id}
// - getPublishedBlogBySlug -> GET /api/blogs/published/slug/{slug}
// - deleteBlogByID -> DELETE /api/blogs/{id}
// - createBlog -> POST /api/blogs/create
// - toggleBlogPublished -> PATCH /api/blogs/{id}/toggle-publish
// - updateBlog -> PUT /api/blogs/{id}
//
// 前端调用层：lib/blog-api.ts
// 前端Hooks：features/blog/api/