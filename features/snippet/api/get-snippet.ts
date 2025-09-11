import { useRequest } from "ahooks";

import { getSnippetByIdApi } from "@/lib/snippet-api";

// 将后端响应转换为前端期望的格式
function convertToFrontendResponse(backendResponse: any) {
  if (!backendResponse.data) {
    return { snippet: null };
  }

  const item = backendResponse.data;
  return {
    snippet: {
      id: item.id.toString(),
      title: item.title,
      slug: item.slug,
      description: item.description,
      body: item.body,
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

export const useGetSnippet = (id: string, ready: boolean) => {
  return useRequest(
    async () => {
      const response = await getSnippetByIdApi(id);
      return convertToFrontendResponse(response);
    },
    {
      ready,
      loadingDelay: 300,
    }
  );
};
