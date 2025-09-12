"use client";

import { useEffect, useState } from "react";
import { SnippetList } from "@/features/snippet";
import { getPublishedSnippetsApi } from "@/lib/snippet-api";
import { type Snippet } from "@/features/snippet/types";
import { IllustrationNoContent } from "@/components/illustrations";

export default function Page() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        setLoading(true);
        const response = await getPublishedSnippetsApi();
        setSnippets(response.data || []);
      } catch (err) {
        console.error('获取代码片段失败:', err);
        setError('获取代码片段失败');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  if (loading) {
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
        <div className="grid place-content-center gap-8">
          <div className="text-center">加载中...</div>
        </div>
      </div>
    );
  }

  if (error) {
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
        <div className="grid place-content-center gap-8">
          <IllustrationNoContent className="size-[30vh]" />
          <h3 className="text-center text-2xl font-semibold tracking-tight">
            {error}
          </h3>
        </div>
      </div>
    );
  }

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
