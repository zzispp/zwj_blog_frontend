"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { isNil } from "es-toolkit";
import { BlogDetailPage } from "@/features/blog";
import { getPublishedBlogBySlugApi, type BlogItem } from "@/lib/blog-api";
import { IllustrationNoContent } from "@/components/illustrations";

export default function Page() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await getPublishedBlogBySlugApi(slug);
        const blogData = response.data;

        if (isNil(blogData)) {
          setError('博客不存在');
        } else {
          setBlog(blogData);
        }
      } catch (err) {
        console.error('获取博客详情失败:', err);
        setError('获取博客详情失败');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-wrapper flex-col px-6 pt-8 pb-24">
        <div className="grid place-content-center gap-8">
          <div className="text-center">加载中...</div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="mx-auto flex min-h-screen max-w-wrapper flex-col px-6 pt-8 pb-24">
        <div className="grid place-content-center gap-8">
          <IllustrationNoContent className="size-[30vh]" />
          <h3 className="text-center text-2xl font-semibold tracking-tight">
            {error || '博客不存在'}
          </h3>
        </div>
      </div>
    );
  }

  return <BlogDetailPage blog={blog as any} />;
}
