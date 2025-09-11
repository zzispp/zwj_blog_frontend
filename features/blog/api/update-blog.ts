import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { updateBlogApi, toggleBlogPublishApi, type UpdateBlogRequest } from "@/lib/blog-api";
import { type UpdateBlogDTO } from "../types";

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: UpdateBlogDTO): UpdateBlogRequest {
  return {
    id: params.id,
    title: params.title,
    slug: params.slug,
    description: params.description,
    body: params.body,
    cover: params.cover || undefined,
    author: params.author || undefined,
    published: params.published,
    tags: params.tags?.map(id => parseInt(id, 10)), // 转换为数字数组
  };
}

export const useUpdateBlog = () => {
  return useRequest(
    async (blogData: UpdateBlogDTO) => {
      const backendParams = convertToBackendParams(blogData);
      await updateBlogApi(backendParams);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("博客已更新");
      },
      onError(error) {
        showErrorToast(`博客更新失败: ${error.message}`);
      },
    }
  );
};

export const useToggleBlogPublish = () => {
  return useRequest(
    async (id: string) => {
      await toggleBlogPublishApi(id);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("博客发布状态已更新");
      },
      onError(error) {
        showErrorToast(`博客发布状态更新失败: ${error.message}`);
      },
    }
  );
};
