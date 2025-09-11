// 标签管理相关的 API 调用

export interface CreateTagRequest {
    name: string;
    slug: string;
    type: "ALL" | "BLOG" | "NOTE" | "SNIPPET";
    icon?: string;
    iconDark?: string;
}

export interface UpdateTagRequest {
    id: string;
    name?: string;
    slug?: string;
    type?: "ALL" | "BLOG" | "NOTE" | "SNIPPET";
    icon?: string;
    iconDark?: string;
}

export interface GetTagsRequest {
    limit?: number;          // 每页数量，可选，默认10
    offset?: number;         // 偏移量，可选，默认0
    name?: string;           // 按名称筛选，可选
    slug?: string;           // 按slug筛选，可选
    tag_type?: "ALL" | "BLOG" | "NOTE" | "SNIPPET";  // 按类型筛选，可选
}

export interface TagItem {
    id: number;
    name: string;
    slug: string;
    tag_type: "ALL" | "BLOG" | "NOTE" | "SNIPPET";
    icon?: string | null;
    icon_dark?: string | null;
}

export interface GetTagsResponse {
    total: number;           // 总记录数
    items: TagItem[];        // 当前页数据
}

export interface ApiResponse<T> {
    code: number;
    msg: string;
    data?: T;
}

// 前端到后端的标签类型映射
const frontendToBackendTypeMapping: Record<string, string> = {
    "ALL": "All",
    "BLOG": "Blog",
    "NOTE": "Note",
    "SNIPPET": "Snippet"
};

/**
 * 创建标签
 */
export async function createTagApi(tagData: CreateTagRequest): Promise<ApiResponse<void>> {
    try {
        // 转换前端标签类型为后端期望的格式
        const backendTagData = {
            ...tagData,
            type: frontendToBackendTypeMapping[tagData.type] || tagData.type
        };

        const response = await fetch('/api/tags/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(backendTagData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<void> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.msg || '创建标签失败');
        }

        return result;

    } catch (error) {
        console.error('创建标签失败:', error);
        throw error;
    }
}

/**
 * 获取标签列表
 */
export async function getTagsApi(params: GetTagsRequest): Promise<ApiResponse<GetTagsResponse>> {
    try {
        const response = await fetch('/api/tags/list', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<GetTagsResponse> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.msg || '获取标签列表失败');
        }

        return result;

    } catch (error) {
        console.error('获取标签列表失败:', error);
        throw error;
    }
}

/**
 * 获取所有标签
 */
export async function getAllTagsApi(type?: string): Promise<ApiResponse<TagItem[]>> {
    try {
        const url = new URL('/api/tags/all', window.location.origin);
        if (type) {
            url.searchParams.append('type', type);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<TagItem[]> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.msg || '获取所有标签失败');
        }

        return result;

    } catch (error) {
        console.error('获取所有标签失败:', error);
        throw error;
    }
}

/**
 * 获取标签详情
 */
export async function getTagByIdApi(id: string): Promise<ApiResponse<TagItem>> {
    try {
        const response = await fetch(`/api/tags/${id}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<TagItem> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.msg || '获取标签详情失败');
        }

        return result;

    } catch (error) {
        console.error('获取标签详情失败:', error);
        throw error;
    }
}

/**
 * 删除标签
 */
export async function deleteTagApi(id: string): Promise<ApiResponse<void>> {
    try {
        const response = await fetch(`/api/tags/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<void> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.msg || '删除标签失败');
        }

        return result;

    } catch (error) {
        console.error('删除标签失败:', error);
        throw error;
    }
}

/**
 * 更新标签
 */
export async function updateTagApi(tagData: UpdateTagRequest): Promise<ApiResponse<void>> {
    try {
        // 转换前端标签类型为后端期望的格式
        const { id, ...updateData } = tagData;
        const backendTagData = {
            ...updateData,
            type: updateData.type ? frontendToBackendTypeMapping[updateData.type] || updateData.type : undefined
        };

        const response = await fetch(`/api/tags/${id}`, {
            method: 'PUT', // 假设后端使用 PUT 进行更新
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(backendTagData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<void> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.msg || '更新标签失败');
        }

        return result;

    } catch (error) {
        console.error('更新标签失败:', error);
        throw error;
    }
}

/**
 * 检查标签是否存在
 */
export async function checkTagExistsApi(id: string): Promise<ApiResponse<boolean>> {
    try {
        const response = await fetch(`/api/tags/${id}/exists`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: ApiResponse<boolean> = await response.json();

        if (result.code !== 200) {
            throw new Error(result.msg || '检查标签是否存在失败');
        }

        return result;

    } catch (error) {
        console.error('检查标签是否存在失败:', error);
        throw error;
    }
}
