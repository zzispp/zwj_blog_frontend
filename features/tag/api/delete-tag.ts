import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { deleteTagApi } from "@/lib/tag-api";

export const useDeleteTag = () => {
  return useRequest(
    async (id: string) => {
      await deleteTagApi(id);
    },
    {
      manual: true,
      onSuccess() {
        showSuccessToast("标签已删除");
      },
      onError(error) {
        showErrorToast(`标签删除失败: ${error.message}`);
      },
    }
  );
};
