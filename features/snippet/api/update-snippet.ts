import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { updateSnippetApi, toggleSnippetPublishApi, type UpdateSnippetRequest } from "@/lib/snippet-api";
import { type UpdateSnippetDTO } from "../types";

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: UpdateSnippetDTO): UpdateSnippetRequest {
  return {
    id: params.id,
    title: params.title,
    slug: params.slug,
    description: params.description,
    body: params.body,
    published: params.published,
    tags: params.tags?.map(id => parseInt(id, 10)),
  };
}

export const useUpdateSnippet = () => {
  return useRequest(
    async (snippetData: UpdateSnippetDTO) => {
      const backendParams = convertToBackendParams(snippetData);
      await updateSnippetApi(backendParams);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("片段已更新");
      },
      onError(error) {
        showErrorToast(`片段更新: ${error.message}`);
      },
    }
  );
};

export const useToggleSnippetPublish = () => {
  return useRequest(
    async (id: string) => {
      await toggleSnippetPublishApi(id);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("片段发布状态已更新");
      },
      onError(error) {
        showErrorToast(`片段发布状态更新失败: ${error.message}`);
      },
    }
  );
};
