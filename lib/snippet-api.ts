// 代码片段管理相关的 API 调用
import { buildApiUrl } from './api-utils';
import { apiPost, apiGet, apiPut, apiDelete, apiPatch } from './api-client';

export interface CreateSnippetRequest {
    title: string;
    slug: string;
    description: string;
    body: string;
    published?: boolean;
    tags?: number[];
}

export interface UpdateSnippetRequest {
    id: string;
    title?: string;
    slug?: string;
    description?: string;
    body?: string;
    published?: boolean;
    tags?: number[];
}

export interface GetSnippetsRequest {
    limit?: number;
    offset?: number;
    title?: string;
    slug?: string;
    published?: boolean;
    tags?: number[];
    orderBy?: "created_at" | "updated_at" | "title";
    order?: "asc" | "desc";
}

export interface TagItem {
    id: string;
    name: string;
    slug: string;
    type: string;
    icon?: string;
    iconDark?: string;
    created_at: string;
    updated_at: string;
}

export interface SnippetItem {
    id: string;
    title: string;
    slug: string;
    description: string;
    body: string;
    published: boolean;
    tags: TagItem[];
    created_at: string;
    updated_at: string;
}

export interface GetSnippetsResponse {
    total: number;
    items: SnippetItem[];
}

export interface ApiResponse<T> {
    code: number;
    message: string;
    data?: T;
}

/**
 * 创建代码片段
 */
export async function createSnippetApi(snippetData: CreateSnippetRequest): Promise<ApiResponse<SnippetItem>> {
    try {
        return await apiPost<ApiResponse<SnippetItem>>('/api/snippets/create', snippetData);

    } catch (error) {
        console.error('创建代码片段失败:', error);
        throw error;
    }
}

/**
 * 获取代码片段列表
 */
export async function getSnippetsApi(params: GetSnippetsRequest): Promise<ApiResponse<GetSnippetsResponse>> {
    try {
        const response = await fetch('/api/snippets/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<GetSnippetsResponse> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取代码片段列表失败');
        }

        return result;

    } catch (error) {
        console.error('获取代码片段列表失败:', error);
        throw error;
    }
}


/**
 * 获取代码片段详情
 */
export async function getSnippetByIdApi(id: string): Promise<ApiResponse<SnippetItem>> {
    try {
        const response = await fetch(`/api/snippets/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<SnippetItem> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取代码片段详情失败');
        }

        return result;

    } catch (error) {
        console.error('获取代码片段详情失败:', error);
        throw error;
    }
}

/**
 * 根据slug获取代码片段
 */
export async function getSnippetBySlugApi(slug: string): Promise<ApiResponse<SnippetItem>> {
    try {
        const response = await fetch(`/api/snippets/slug/${slug}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<SnippetItem> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取代码片段失败');
        }

        return result;

    } catch (error) {
        console.error('获取代码片段失败:', error);
        throw error;
    }
}

/**
 * 更新代码片段
 */
export async function updateSnippetApi(snippetData: UpdateSnippetRequest): Promise<ApiResponse<SnippetItem>> {
    try {
        const { id, ...updateData } = snippetData;
        return await apiPut<ApiResponse<SnippetItem>>(`/api/snippets/${id}`, updateData);

    } catch (error) {
        console.error('更新代码片段失败:', error);
        throw error;
    }
}

/**
 * 删除代码片段
 */
export async function deleteSnippetApi(id: string): Promise<ApiResponse<{ success: boolean }>> {
    try {
        return await apiDelete<ApiResponse<{ success: boolean }>>(`/api/snippets/${id}`);

    } catch (error) {
        console.error('删除代码片段失败:', error);
        throw error;
    }
}

/**
 * 切换代码片段发布状态
 */
export async function toggleSnippetPublishApi(id: string): Promise<ApiResponse<SnippetItem>> {
    try {
        return await apiPatch<ApiResponse<SnippetItem>>(`/api/snippets/${id}/toggle-publish`);

    } catch (error) {
        console.error('切换代码片段发布状态失败:', error);
        throw error;
    }
}

/**
 * 检查代码片段是否存在
 */
export async function checkSnippetExistsApi(id: string): Promise<ApiResponse<{ exists: boolean }>> {
    try {
        const response = await fetch(`/api/snippets/${id}/exists`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<{ exists: boolean }> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '检查代码片段是否存在失败');
        }

        return result;

    } catch (error) {
        console.error('检查代码片段是否存在失败:', error);
        throw error;
    }
}

// 转换后端响应数据到前端格式
function convertBackendSnippetToFrontend(backendSnippet: any): SnippetItem {
    return {
        id: backendSnippet.id.toString(),
        title: backendSnippet.title,
        slug: backendSnippet.slug,
        description: backendSnippet.description,
        body: backendSnippet.body,
        published: backendSnippet.published,
        tags: backendSnippet.tags.map((tag: any) => ({
            id: tag.id.toString(),
            name: tag.name,
            slug: tag.slug,
            type: tag.type,
            icon: tag.icon,
            iconDark: tag.icon_dark,
            created_at: tag.created_at,
            updated_at: tag.updated_at,
        })),
        created_at: backendSnippet.created_at,
        updated_at: backendSnippet.updated_at,
    };
}

/**
 * 获取已发布代码片段列表
 */
export async function getPublishedSnippetsApi(): Promise<ApiResponse<SnippetItem[]>> {
    try {
        const response = await fetch(buildApiUrl('/api/snippets/published'), {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: any = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取已发布代码片段失败');
        }

        // 转换数据格式
        const convertedData = result.data.map(convertBackendSnippetToFrontend);

        return {
            code: result.code,
            message: result.message,
            data: convertedData,
        };

    } catch (error) {
        console.error('获取已发布代码片段失败:', error);
        throw error;
    }
}

/**
 * 根据slug获取代码片段（不区分发布状态，在前端过滤）
 */
export async function getPublishedSnippetBySlugApi(slug: string): Promise<ApiResponse<SnippetItem>> {
    try {
        const response = await fetch(buildApiUrl(`/api/snippets/slug/${slug}`), {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: any = await response.json();

        if (result.code !== 200) {
            throw new Error(result.message || '获取已发布代码片段失败');
        }

        // 转换数据格式
        const convertedData = convertBackendSnippetToFrontend(result.data);

        return {
            code: result.code,
            message: result.message,
            data: convertedData,
        };

    } catch (error) {
        console.error('获取已发布代码片段失败:', error);
        throw error;
    }
}
