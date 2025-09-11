// 笔记管理相关的 Server Actions 已全部迁移到后端 API
// 
// 对应的后端接口映射：
// - isNoteExistByID -> GET /api/notes/{id}/exists
// - getNotes -> POST /api/notes/list  
// - getAllNotes -> GET /api/notes/all
// - getNoteByID -> GET /api/notes/{id}
// - deleteNoteByID -> DELETE /api/notes/{id}
// - createNote -> POST /api/notes/create
// - toggleNotePublished -> PATCH /api/notes/{id}/toggle-publish
// - updateNote -> PUT /api/notes/{id}
//
// 前端调用层：lib/note-api.ts
// 前端Hooks：features/note/api/