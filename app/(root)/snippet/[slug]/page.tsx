import { notFound } from "next/navigation";

import { isNil } from "es-toolkit";

import { SnippetDetailPage } from "@/features/snippet";
import { getPublishedSnippetBySlugApi } from "@/lib/snippet-api";

export const revalidate = 60;

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;

  try {
    // 直接调用后端API获取代码片段
    const response = await getPublishedSnippetBySlugApi(params.slug);
    const snippet = response.data;

    if (isNil(snippet) || !snippet.published) {
      return notFound();
    }

    return <SnippetDetailPage snippet={snippet} />;
  } catch (error) {
    return notFound();
  }
}
