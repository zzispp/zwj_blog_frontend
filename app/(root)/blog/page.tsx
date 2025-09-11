import { BlogList } from "@/features/blog";
import { getPublishedBlogsApi } from "@/lib/blog-api";

export const revalidate = 60;

export default async function Page() {
  // 直接调用后端API获取已发布博客
  const response = await getPublishedBlogsApi();
  const blogs = response.data || [];

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

      <BlogList blogs={blogs} />
    </div>
  );
}
