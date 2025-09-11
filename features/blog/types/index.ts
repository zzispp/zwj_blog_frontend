import { z } from "zod";

import { PUBLISHED_ENUM, REGEX } from "@/constants";

export const createBlogSchema = z.object({
  title: z.string().min(1, { message: "长度不能少于1个字符" }),
  slug: z
    .string()
    .regex(REGEX.SLUG, {
      message: "只允许输入数字、小写字母和中横线",
    })
    .min(1, { message: "长度不能少于1个字符" }),
  description: z.string().min(1, { message: "长度不能少于1个字符" }),
  cover: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  body: z.string().min(1, { message: "长度不能少于1个字符" }),
  published: z.boolean().optional(),
  tags: z.string().array().optional(),
});

export const updateBlogSchema = createBlogSchema.partial().extend({
  id: z.string().min(1),
});

export const getBlogsSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  published: z
    .enum([
      PUBLISHED_ENUM.ALL,
      PUBLISHED_ENUM.PUBLISHED,
      PUBLISHED_ENUM.NO_PUBLISHED,
    ])
    .optional(),
  tags: z.string().array().optional(),
  pageIndex: z.number(),
  pageSize: z.number(),
  orderBy: z.enum(["created_at", "updated_at"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type CreateBlogDTO = z.infer<typeof createBlogSchema>;
export type UpdateBlogDTO = z.infer<typeof updateBlogSchema>;
export type GetBlogsDTO = z.infer<typeof getBlogsSchema>;

// 定义 Blog 类型（原来从 getBlogs 推导，现在手动定义）
export interface Blog {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
  cover?: string | null;
  author?: string | null;
  published: boolean;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
    type: string;
    icon?: string | null;
    iconDark?: string | null;
    created_at?: string;
    updated_at?: string;
  }>;
  created_at: string;
  updated_at: string;
}
