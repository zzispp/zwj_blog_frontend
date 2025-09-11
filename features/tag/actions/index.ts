// Tag相关的所有服务端功能已迁移到后端API
// 此文件保留作为迁移记录

// isTagExistByID 已迁移到后端接口，由 GET /api/tags/{id}/exists 处理
// getTags 已迁移到后端接口，由 /api/tags/list 处理  
// getAllTags 已迁移到后端接口，由 /api/tags/all 处理
// createTag 已迁移到后端接口，由 /api/tags/create 处理
// deleteTagByID 已迁移到后端接口，由 DELETE /api/tags/{id} 处理
// updateTag 已迁移到后端接口，由 PUT /api/tags/{id} 处理
// getTagByID 已迁移到后端接口，由 GET /api/tags/{id} 处理

// 所有相关的API调用现在通过 /lib/tag-api.ts 中的函数处理
