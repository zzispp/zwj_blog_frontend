import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { deleteBlogApi } from "@/lib/blog-api";

export const useDeleteBlog = () => {
  return useRequest(
    async (id: string) => {
      await deleteBlogApi(id);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("博客已删除");
      },
      onError(error) {
        showErrorToast(`博客删除失败: ${error.message}`);
      },
    }
  );
};
