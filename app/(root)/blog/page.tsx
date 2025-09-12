"use client";

import { useEffect, useState } from "react";
import { BlogList } from "@/features/blog";
import { getPublishedBlogsApi, type BlogItem } from "@/lib/blog-api";
import { IllustrationNoContent } from "@/components/illustrations";

export default function Page() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await getPublishedBlogsApi();
        setBlogs(response.data || []);
      } catch (err) {
        console.error('获取博客失败:', err);
        setError('获取博客失败');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
          最新文章
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
          最新文章
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
        最新文章
      </h2>

      <BlogList blogs={blogs as any} />
    </div>
  );
}
