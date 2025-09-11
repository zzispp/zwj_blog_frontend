import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { deleteNoteApi } from "@/lib/note-api";

export const useDeleteNote = () => {
  return useRequest(
    async (id: string) => {
      await deleteNoteApi(id);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("笔记已删除");
      },
      onError(error) {
        showErrorToast(`笔记删除失败: ${error.message}`);
      },
    }
  );
};
