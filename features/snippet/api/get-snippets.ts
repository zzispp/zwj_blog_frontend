import { useRequest } from "ahooks";

import { getSnippetsApi, type GetSnippetsRequest } from "@/lib/snippet-api";
import { type GetSnippetsDTO } from "../types";

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: GetSnippetsDTO): GetSnippetsRequest {
  // 处理published字段的映射
  let publishedValue: boolean | undefined = undefined;
  if (params.published === "published") {
    publishedValue = true;
  } else if (params.published === "no_published") {
    publishedValue = false;
  }

  return {
    limit: params.pageSize,
    offset: (params.pageIndex - 1) * params.pageSize,
    title: params.title,
    slug: params.slug,
    published: publishedValue,
    tags: params.tags?.map(id => parseInt(id, 10)),
    orderBy: params.orderBy === "createdAt" ? "created_at" : params.orderBy === "updatedAt" ? "updated_at" : params.orderBy,
    order: params.order,
  };
}

// 将后端响应转换为前端期望的格式
function convertToFrontendResponse(backendResponse: any) {
  return {
    snippets: backendResponse.data.items.map((item: any) => ({
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
    })),
    total: backendResponse.data.total,
  };
}

export const useGetSnippets = (params: GetSnippetsDTO) => {
  return useRequest(
    async () => {
      const backendParams = convertToBackendParams(params);
      const response = await getSnippetsApi(backendParams);
      return convertToFrontendResponse(response);
    },
    {
      refreshDeps: [params],
      loadingDelay: 300,
    }
  );
};
