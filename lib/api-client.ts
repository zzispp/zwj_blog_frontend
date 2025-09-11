// API 客户端工具，自动处理 JWT token 认证和错误处理

import { buildApiUrl } from './api-utils';

export interface ApiError {
    code: number;
    message: string;
}

export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

/**
 * 获取存储的 JWT token
 */
function getJwtToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('jwt-token');
}

/**
 * 清除认证信息（当token过期时）
 */
function clearAuth(): void {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('jwt-token');
    localStorage.removeItem('solana-auth-user');
    document.cookie = 'solana-auth-user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

    // 跳转到登录页
    window.location.href = '/auth/sign-in';
}

/**
 * 创建带认证的 fetch 请求
 */
export async function authenticatedFetch(
    url: string,
    options: RequestInit = {}
): Promise<Response> {
    const token = getJwtToken();

    const headers = new Headers(options.headers);

    // 如果有 token，添加到请求头
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    // 确保 Content-Type 为 JSON（除非是文件上传）
    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(buildApiUrl(url), {
        ...options,
        headers,
    });

    // 处理 401 未授权错误
    if (response.status === 401) {
        clearAuth();
        throw new AuthError('认证已过期，请重新登录');
    }

    return response;
}

/**
 * 执行需要认证的 API 请求
 */
export async function apiRequest<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await authenticatedFetch(url, options);

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();

    if (result.code && result.code !== 200) {
        throw new Error(result.message || '请求失败');
    }

    return result;
}

/**
 * GET 请求（通常不需要认证）
 */
export async function apiGet<T>(url: string): Promise<T> {
    return apiRequest<T>(url, { method: 'GET' });
}

/**
 * POST 请求（需要认证）
 */
export async function apiPost<T>(url: string, data?: any): Promise<T> {
    return apiRequest<T>(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * PUT 请求（需要认证）
 */
export async function apiPut<T>(url: string, data?: any): Promise<T> {
    return apiRequest<T>(url, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * DELETE 请求（需要认证）
 */
export async function apiDelete<T>(url: string): Promise<T> {
    return apiRequest<T>(url, { method: 'DELETE' });
}

/**
 * PATCH 请求（需要认证）
 */
export async function apiPatch<T>(url: string, data?: any): Promise<T> {
    return apiRequest<T>(url, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
    });
}

/**
 * 文件上传请求（需要认证）
 */
export async function apiUpload<T>(url: string, formData: FormData): Promise<T> {
    return apiRequest<T>(url, {
        method: 'POST',
        body: formData,
    });
}
