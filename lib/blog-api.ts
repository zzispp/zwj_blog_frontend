// 博客管理相关的 API 调用
import { buildApiUrl } from './api-utils';
import { apiPost, apiGet, apiPut, apiDelete, apiPatch } from './api-client';

export interface CreateBlogRequest {
  title: string;
  slug: string;
  description: string;
  body: string;
  cover?: string;
  author?: string;
  published?: boolean;
  tags?: number[];
}

export interface UpdateBlogRequest {
  id: string;
  title?: string;
  slug?: string;
  description?: string;
  body?: string;
  cover?: string;
  author?: string;
  published?: boolean;
  tags?: number[];
}

export interface GetBlogsRequest {
  limit?: number;
  offset?: number;
  title?: string;
  slug?: string;
  author?: string;
  published?: boolean;
  tags?: number[];
  orderBy?: "created_at" | "updated_at" | "title";
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

export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  body: string;
  cover?: string;
  author?: string;
  published: boolean;
  tags: TagItem[];
  created_at: string;
  updated_at: string;
}

export interface GetBlogsResponse {
  total: number;
  items: BlogItem[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

/**
 * 创建博客
 */
export async function createBlogApi(blogData: CreateBlogRequest): Promise<ApiResponse<BlogItem>> {
  try {
    return await apiPost<ApiResponse<BlogItem>>('/api/blogs/create', blogData);

  } catch (error) {
    console.error('创建博客失败:', error);
    throw error;
  }
}

/**
 * 获取博客列表
 */
export async function getBlogsApi(params: GetBlogsRequest): Promise<ApiResponse<GetBlogsResponse>> {
  try {
    const response = await fetch('/api/blogs/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<GetBlogsResponse> = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || '获取博客列表失败');
    }

    return result;

  } catch (error) {
    console.error('获取博客列表失败:', error);
    throw error;
  }
}

// 转换后端响应数据到前端格式
function convertBackendBlogToFrontend(backendBlog: any): BlogItem {
  return {
    id: backendBlog.id,
    title: backendBlog.title,
    slug: backendBlog.slug,
    description: backendBlog.description,
    body: backendBlog.body,
    cover: backendBlog.cover,
    author: backendBlog.author,
    published: backendBlog.published,
    tags: backendBlog.tags.map((tag: any) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      type: tag.type,
      icon: tag.icon,
      iconDark: tag.icon_dark,
      created_at: tag.created_at,
      updated_at: tag.updated_at,
    })),
    created_at: backendBlog.created_at,
    updated_at: backendBlog.updated_at,
  };
}

/**
 * 获取已发布博客列表
 */
export async function getPublishedBlogsApi(): Promise<ApiResponse<BlogItem[]>> {
  try {
    const response = await fetch(buildApiUrl('/api/blogs/published'), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: any = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || '获取已发布博客失败');
    }

    // 转换数据格式
    const convertedData = result.data.map(convertBackendBlogToFrontend);

    return {
      code: result.code,
      message: result.message,
      data: convertedData,
    };

  } catch (error) {
    console.error('获取已发布博客失败:', error);
    throw error;
  }
}

/**
 * 获取博客详情
 */
export async function getBlogByIdApi(id: string): Promise<ApiResponse<BlogItem>> {
  try {
    const response = await fetch(`/api/blogs/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<BlogItem> = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || '获取博客详情失败');
    }

    return result;

  } catch (error) {
    console.error('获取博客详情失败:', error);
    throw error;
  }
}

/**
 * 根据slug获取博客
 */
export async function getBlogBySlugApi(slug: string): Promise<ApiResponse<BlogItem>> {
  try {
    const response = await fetch(`/api/blogs/slug/${slug}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<BlogItem> = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || '获取博客失败');
    }

    return result;

  } catch (error) {
    console.error('获取博客失败:', error);
    throw error;
  }
}

/**
 * 根据slug获取已发布博客
 */
export async function getPublishedBlogBySlugApi(slug: string): Promise<ApiResponse<BlogItem>> {
  try {
    const response = await fetch(buildApiUrl(`/api/blogs/published/slug/${slug}`), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: any = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || '获取已发布博客失败');
    }

    // 转换数据格式
    const convertedData = convertBackendBlogToFrontend(result.data);

    return {
      code: result.code,
      message: result.message,
      data: convertedData,
    };

  } catch (error) {
    console.error('获取已发布博客失败:', error);
    throw error;
  }
}

/**
 * 更新博客
 */
export async function updateBlogApi(blogData: UpdateBlogRequest): Promise<ApiResponse<BlogItem>> {
  try {
    const { id, ...updateData } = blogData;
    return await apiPut<ApiResponse<BlogItem>>(`/api/blogs/${id}`, updateData);

  } catch (error) {
    console.error('更新博客失败:', error);
    throw error;
  }
}

/**
 * 删除博客
 */
export async function deleteBlogApi(id: string): Promise<ApiResponse<{ success: boolean }>> {
  try {
    return await apiDelete<ApiResponse<{ success: boolean }>>(`/api/blogs/${id}`);

  } catch (error) {
    console.error('删除博客失败:', error);
    throw error;
  }
}

/**
 * 切换博客发布状态
 */
export async function toggleBlogPublishApi(id: string): Promise<ApiResponse<BlogItem>> {
  try {
    return await apiPatch<ApiResponse<BlogItem>>(`/api/blogs/${id}/toggle-publish`);

  } catch (error) {
    console.error('切换博客发布状态失败:', error);
    throw error;
  }
}

/**
 * 检查博客是否存在
 */
export async function checkBlogExistsApi(id: string): Promise<ApiResponse<{ exists: boolean }>> {
  try {
    const response = await fetch(`/api/blogs/${id}/exists`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<{ exists: boolean }> = await response.json();

    if (result.code !== 200) {
      throw new Error(result.message || '检查博客是否存在失败');
    }

    return result;

  } catch (error) {
    console.error('检查博客是否存在失败:', error);
    throw error;
  }
}
