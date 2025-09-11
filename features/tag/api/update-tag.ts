import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { updateTagApi, type UpdateTagRequest } from "@/lib/tag-api";

export const useUpdateTag = () => {
  return useRequest(
    async (tagData: UpdateTagRequest) => {
      await updateTagApi(tagData);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("标签已更新");
      },
      onError(error) {
        showErrorToast(`标签更新失败: ${error.message}`);
      },
    }
  );
};
