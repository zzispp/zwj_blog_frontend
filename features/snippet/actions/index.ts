// 代码片段管理相关的 Server Actions 已全部迁移到后端 API
// 
// 对应的后端接口映射：
// - isSnippetExistByID -> GET /api/snippets/{id}/exists
// - getSnippets -> POST /api/snippets/list  
// - getPublishedSnippets -> GET /api/snippets/published
// - getSnippetByID -> GET /api/snippets/{id}
// - getSnippetBySlug -> GET /api/snippets/slug/{slug}
// - deleteSnippetByID -> DELETE /api/snippets/{id}
// - createSnippet -> POST /api/snippets/create
// - toggleSnippetPublished -> PATCH /api/snippets/{id}/toggle-publish
// - updateSnippet -> PUT /api/snippets/{id}
//
// 前端调用层：lib/snippet-api.ts
// 前端Hooks：features/snippet/api/