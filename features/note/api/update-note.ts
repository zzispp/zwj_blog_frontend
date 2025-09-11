import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { updateNoteApi, toggleNotePublishApi, type UpdateNoteRequest } from "@/lib/note-api";
import { type UpdateNoteDTO } from "../types";

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: UpdateNoteDTO): UpdateNoteRequest {
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

export const useUpdateNote = () => {
  return useRequest(
    async (noteData: UpdateNoteDTO) => {
      const backendParams = convertToBackendParams(noteData);
      await updateNoteApi(backendParams);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("笔记已更新");
      },
      onError(error) {
        showErrorToast(`笔记更新失败: ${error.message}`);
      },
    }
  );
};

export const useToggleNotePublish = () => {
  return useRequest(
    async (id: string) => {
      await toggleNotePublishApi(id);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("笔记发布状态已更新");
      },
      onError(error) {
        showErrorToast(`笔记发布状态更新失败: ${error.message}`);
      },
    }
  );
};
