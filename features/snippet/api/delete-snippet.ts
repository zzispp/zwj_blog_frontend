import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { deleteSnippetApi } from "@/lib/snippet-api";

export const useDeleteSnippet = () => {
  return useRequest(
    async (id: string) => {
      await deleteSnippetApi(id);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("片段已删除");
      },
      onError(error) {
        showErrorToast(`片段删除失败: ${error.message}`);
      },
    }
  );
};
