import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { createBlogApi, type CreateBlogRequest } from "@/lib/blog-api";
import { type CreateBlogDTO } from "../types";

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: CreateBlogDTO): CreateBlogRequest {
  return {
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

export const useCreateBlog = () => {
  return useRequest(
    async (blogData: CreateBlogDTO) => {
      const backendParams = convertToBackendParams(blogData);
      await createBlogApi(backendParams);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("博客创建成功");
      },
      onError(error) {
        showErrorToast(`博客创建失败: ${error.message}`);
      },
    }
  );
};
