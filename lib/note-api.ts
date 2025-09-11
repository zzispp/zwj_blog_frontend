// 笔记管理相关的 API 调用
import { apiPost, apiGet, apiPut, apiDelete, apiPatch } from './api-client';

export interface CreateNoteRequest {
    body: string;
    published?: boolean;
    tags?: number[];
}

export interface UpdateNoteRequest {
    id: string;
    body?: string;
    published?: boolean;
    tags?: number[];
}

export interface GetNotesRequest {
    limit?: number;
    offset?: number;
    body?: string;
    published?: boolean;
    tags?: number[];
    orderBy?: "created_at" | "updated_at";
    order?: "asc" | "desc";
}

export interface TagItem {
    id: number;
    name: string;
    slug: string;
    type: string;
    icon?: string;
    iconDark?: string;
    created_at: string;
    updated_at: string;
}

export interface NoteItem {
    id: number;
    body: string;
    published: boolean;
    tags: TagItem[];
    created_at: string;
    updated_at: string;
}

export interface GetNotesResponse {
    total: number;
    items: NoteItem[];
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data?: T;
}

/**
 * 创建笔记
 */
export async function createNoteApi(noteData: CreateNoteRequest): Promise<ApiResponse<NoteItem>> {
    try {
        return await apiPost<ApiResponse<NoteItem>>('/api/notes/create', noteData);

    } catch (error) {
        console.error('创建笔记失败:', error);
        throw error;
    }
}

/**
 * 获取笔记列表
 */
export async function getNotesApi(params: GetNotesRequest): Promise<ApiResponse<GetNotesResponse>> {
    try {
        const response = await fetch('/api/notes/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<GetNotesResponse> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取笔记列表失败');
        }

        return result;

    } catch (error) {
        console.error('获取笔记列表失败:', error);
        throw error;
    }
}

/**
 * 获取所有笔记
 */
export async function getAllNotesApi(): Promise<ApiResponse<NoteItem[]>> {
    try {
        const response = await fetch('/api/notes/all', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<NoteItem[]> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取所有笔记失败');
        }

        return result;

    } catch (error) {
        console.error('获取所有笔记失败:', error);
        throw error;
    }
}

/**
 * 获取笔记详情
 */
export async function getNoteByIdApi(id: string): Promise<ApiResponse<NoteItem>> {
    try {
        const response = await fetch(`/api/notes/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<NoteItem> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取笔记详情失败');
        }

        return result;

    } catch (error) {
        console.error('获取笔记详情失败:', error);
        throw error;
    }
}

/**
 * 更新笔记
 */
export async function updateNoteApi(noteData: UpdateNoteRequest): Promise<ApiResponse<NoteItem>> {
    try {
        const { id, ...updateData } = noteData;
        return await apiPut<ApiResponse<NoteItem>>(`/api/notes/${id}`, updateData);

    } catch (error) {
        console.error('更新笔记失败:', error);
        throw error;
    }
}

/**
 * 删除笔记
 */
export async function deleteNoteApi(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
        return await apiDelete<ApiResponse<{ success: boolean }>>(`/api/notes/${id}`);

    } catch (error) {
        console.error('删除笔记失败:', error);
        throw error;
    }
}

/**
 * 切换笔记发布状态
 */
export async function toggleNotePublishApi(id: string): Promise<ApiResponse<NoteItem>> {
    try {
        return await apiPatch<ApiResponse<NoteItem>>(`/api/notes/${id}/toggle-publish`);

    } catch (error) {
        console.error('切换笔记发布状态失败:', error);
        throw error;
    }
}

/**
 * 检查笔记是否存在
 */
export async function checkNoteExistsApi(id: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
        const response = await fetch(`/api/notes/${id}/exists`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<{ exists: boolean }> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '检查笔记是否存在失败');
        }

        return result;

    } catch (error) {
        console.error('检查笔记是否存在失败:', error);
        throw error;
    }
}
