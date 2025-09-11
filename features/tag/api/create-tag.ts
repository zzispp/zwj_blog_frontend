import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { createTagApi, type CreateTagRequest } from "@/lib/tag-api";

export const useCreateTag = () => {
  return useRequest(
    async (tagData: CreateTagRequest) => {
      await createTagApi(tagData);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("标签已创建");
      },
      onError(error) {
        showErrorToast(`标签创建失败: ${error.message}`);
      },
    }
  );
};
