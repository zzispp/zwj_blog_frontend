import { useRequest } from "ahooks";

import { showErrorToast, showSuccessToast } from "@/components/toast";
import { createNoteApi, type CreateNoteRequest } from "@/lib/note-api";
import { type CreateNoteDTO } from "../types";

// 将前端参数转换为后端参数格式
function convertToBackendParams(params: CreateNoteDTO): CreateNoteRequest {
  return {
    title: params.title,
    slug: params.slug,
    description: params.description,
    body: params.body,
    published: params.published,
    tags: params.tags?.map(id => parseInt(id, 10)),
  };
}

export const useCreateNote = () => {
  return useRequest(
    async (noteData: CreateNoteDTO) => {
      const backendParams = convertToBackendParams(noteData);
      await createNoteApi(backendParams);
    },
    {
      manual: true,
      loadingDelay: 300,
      onSuccess() {
        showSuccessToast("笔记已创建");
      },
      onError(error) {
        showErrorToast(`笔记创建失败: ${error.message}`);
      },
    }
  );
};
