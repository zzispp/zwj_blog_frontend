import { SnippetList } from "@/features/snippet";
import { getPublishedSnippetsApi } from "@/lib/snippet-api";

export const revalidate = 60;

export default async function Page() {
  // 直接调用后端API获取已发布代码片段
  const response = await getPublishedSnippetsApi();
  const snippets = response.data || [];

  return (
    <div className="mx-auto flex min-h-screen max-w-wrapper flex-col px-6 pt-8 pb-24">
      <h2
        className={`
          pb-8 text-3xl font-bold
          md:text-4xl
        `}
      >
        最新片段
      </h2>

      <SnippetList snippets={snippets} />
    </div>
  );
}
