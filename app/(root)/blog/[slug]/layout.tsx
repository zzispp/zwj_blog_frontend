import * as React from "react";

import { type Metadata } from "next";

import { isNil } from "es-toolkit";

import { WEBSITE } from "@/constants";
import { getPublishedBlogBySlugApi } from "@/lib/blog-api";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const response = await getPublishedBlogBySlugApi(params.slug);
  const blog = response.data;

  if (isNil(blog)) {
    return {};
  }

  return {
    title: `${blog.title} - ${WEBSITE}`,
    description: blog.description,
    keywords: blog.tags.map((el) => el.name).join(","),
  };
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
