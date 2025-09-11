import { notFound } from "next/navigation";

import { isNil } from "es-toolkit";

import { BlogDetailPage } from "@/features/blog";
import { getPublishedBlogBySlugApi } from "@/lib/blog-api";

export const revalidate = 60;

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const response = await getPublishedBlogBySlugApi(params.slug);
  const blog = response.data;

  if (isNil(blog)) {
    return notFound();
  }

  return <BlogDetailPage blog={blog} />;
}
