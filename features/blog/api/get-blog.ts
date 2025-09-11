import { useRequest } from "ahooks";

import { getBlogByIdApi } from "@/lib/blog-api";

// 将后端响应转换为前端期望的格式
function convertToFrontendResponse(backendResponse: any) {
  if (!backendResponse.data) {
    return { blog: null };
  }

  const item = backendResponse.data;
  return {
    blog: {
      id: item.id.toString(),
      title: item.title,
      slug: item.slug,
      description: item.description,
      body: item.body,
      cover: item.cover,
      author: item.author,
      published: item.published,
      tags: item.tags.map((tag: any) => ({
        id: tag.id.toString(),
        name: tag.name,
        slug: tag.slug,
        type: tag.type,
        icon: tag.icon,
        iconDark: tag.iconDark || tag.icon_dark,
        createdAt: tag.created_at,
        updatedAt: tag.updated_at,
      })),
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    },
  };
}

export const useGetBlog = (id: string, ready: boolean) => {
  return useRequest(
    async () => {
      const response = await getBlogByIdApi(id);
      return convertToFrontendResponse(response);
    },
    {
      ready,
      loadingDelay: 300,
    }
  );
};
