// 后端文件上传相关的 API 调用
import { apiUpload } from './api-client';

export interface UploadFileResponse {
    file_name: string;
    url: string;
}

export interface UploadResponse {
    code: number;
    message: string;
    data: {
        files: UploadFileResponse[];
    };
}

export interface UploadResult {
    error?: string;
    url?: string;
}

/**
 * 上传文件到后端（通过 Next.js 反向代理）
 */
export async function uploadFileToBackend(formData: FormData): Promise<UploadResult> {
    try {
        const result: UploadResponse = await apiUpload<UploadResponse>('/api/files/upload', formData);

        if (result.data.files.length === 0) {
            throw new Error('没有上传成功的文件');
        }

        // 返回第一个文件的完整URL（通过反向代理）
        const uploadedFile = result.data.files[0];
        if (!uploadedFile) {
            throw new Error('上传响应中没有文件信息');
        }

        const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST || '127.0.0.1:8080';
        const fullUrl = `https://${backendHost}${uploadedFile.url}`;

        return { url: fullUrl };

    } catch (error) {
        console.error('文件上传失败:', error);
        return {
            error: error instanceof Error ? error.message : '上传过程中发生错误'
        };
    }
}
