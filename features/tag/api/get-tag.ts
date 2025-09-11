import { useRequest } from "ahooks";

import { getTagByIdApi } from "@/lib/tag-api";

// 后端到前端的标签类型映射
const tagTypeMapping: Record<string, string> = {
  "All": "ALL",
  "Blog": "BLOG",
  "Note": "NOTE",
  "Snippet": "SNIPPET"
};

export const useGetTag = (id: string, ready: boolean) => {
  return useRequest(
    async () => {
      const response = await getTagByIdApi(id);

      if (!response.data) {
        return { tag: null };
      }

      // 转换后端响应为前端期望格式
      const tag = {
        id: response.data.id.toString(),
        name: response.data.name,
        slug: response.data.slug,
        type: tagTypeMapping[response.data.tag_type] || response.data.tag_type,
        icon: response.data.icon,
        iconDark: response.data.icon_dark,
        _count: {
          blogs: 0,
          notes: 0,
          snippets: 0,
        },
      };

      return { tag };
    },
    {
      ready,
      loadingDelay: 300,
    }
  );
};
