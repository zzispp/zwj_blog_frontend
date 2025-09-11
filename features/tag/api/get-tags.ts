import { type TagTypeEnum } from "@/constants";
import { useRequest } from "ahooks";

import { getTagsApi, getAllTagsApi, type GetTagsRequest } from "@/lib/tag-api";
import { type GetTagsDTO } from "../types";

// 前端到后端的标签类型映射
const frontendToBackendTypeMapping: Record<string, string> = {
  "ALL": "All",
  "BLOG": "Blog",
  "NOTE": "Note",
  "SNIPPET": "Snippet"
};

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: GetTagsDTO): GetTagsRequest {
  return {
    limit: params.pageSize,
    offset: (params.pageIndex - 1) * params.pageSize, // pageIndex从1开始，需要减1
    name: params.name,
    slug: params.slug,
    tag_type: params.type ? (frontendToBackendTypeMapping[params.type] as any) || params.type : undefined,
    // 注意：orderBy 和 order 暂时不传给后端，后端可能有自己的排序逻辑
  };
}

// 后端到前端的标签类型映射
const tagTypeMapping: Record<string, string> = {
  "All": "ALL",
  "Blog": "BLOG",
  "Note": "NOTE",
  "Snippet": "SNIPPET"
};

// 将后端响应转换为前端期望的格式
function convertToFrontendResponse(backendResponse: any) {
  return {
    tags: backendResponse.data.items.map((item: any) => ({
      id: item.id.toString(), // 转换为字符串 ID（如果前端期望字符串）
      name: item.name,
      slug: item.slug,
      type: tagTypeMapping[item.tag_type] || item.tag_type, // 转换标签类型
      icon: item.icon,
      iconDark: item.icon_dark,
      // 临时为 _count 提供默认值，直到后端提供真实的统计数据
      _count: {
        blogs: 0,
        notes: 0,
        snippets: 0,
      },
      // 注意：这里可能需要添加其他字段如 createdAt, updatedAt 等
    })),
    total: backendResponse.data.total,
  };
}

export const useGetTags = (params: GetTagsDTO) => {
  return useRequest(
    async () => {
      const backendParams = convertToBackendParams(params);
      const response = await getTagsApi(backendParams);
      return convertToFrontendResponse(response);
    },
    {
      refreshDeps: [params],
      loadingDelay: 300,
    }
  );
};

// 使用后端 API 获取所有标签
export const useGetAllTags = (type?: TagTypeEnum) => {
  return useRequest(async () => {
    const typeParam = type ? frontendToBackendTypeMapping[type] || type : undefined;
    const response = await getAllTagsApi(typeParam);

    // 转换后端响应为前端期望格式
    const tags = response.data?.map((item: any) => ({
      id: item.id.toString(),
      name: item.name,
      slug: item.slug,
      type: tagTypeMapping[item.tag_type] || item.tag_type,
      icon: item.icon,
      iconDark: item.icon_dark,
      _count: {
        blogs: 0,
        notes: 0,
        snippets: 0,
      },
    })) || [];

    return { tags, total: tags.length };
  });
};
