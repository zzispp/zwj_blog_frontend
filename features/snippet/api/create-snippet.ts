import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { createSnippetApi, type CreateSnippetRequest } from "@/lib/snippet-api";
import { type CreateSnippetDTO } from "../types";

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: CreateSnippetDTO): CreateSnippetRequest {
  return {
    title: params.title,
    slug: params.slug,
    description: params.description,
    body: params.body,
    published: params.published,
    tags: params.tags?.map(id => parseInt(id, 10)),
  };
}

export const useCreateSnippet = () => {
  return useRequest(
    async (snippetData: CreateSnippetDTO) => {
      const backendParams = convertToBackendParams(snippetData);
      await createSnippetApi(backendParams);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("片段已创建");
      },
      onError(error) {
        showErrorToast(`片段创建失败: ${error.message}`);
      },
    }
  );
};
