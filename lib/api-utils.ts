/**
 * 构建完整的 API URL
 * 在服务端环境下需要完整的 URL，客户端可以使用相对路径
 */
export function buildApiUrl(path: string): string {
    // 服务端环境
    if (typeof window === 'undefined') {
        const baseUrl = process.env.BACKEND_HOST || '127.0.0.1:8080';
        return `http://${baseUrl}${path}`;
    }

    // 客户端环境，使用相对路径（由 next.config.mjs 的 rewrites 处理）
    return path;
}
