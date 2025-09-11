import * as React from "react";

import { type Metadata } from "next";

import { isNil } from "es-toolkit";

import { WEBSITE } from "@/constants";
import { getPublishedSnippetBySlugApi } from "@/lib/snippet-api";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  try {
    // 直接调用后端API获取代码片段
    const response = await getPublishedSnippetBySlugApi(params.slug);
    const snippet = response.data;

    if (isNil(snippet) || !snippet.published) {
      return {};
    }

    return {
      title: `${snippet.title} - ${WEBSITE}`,
      description: snippet.description,
      keywords: snippet.tags.map((el) => el.name).join(","),
    };
  } catch (error) {
    return {};
  }
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
