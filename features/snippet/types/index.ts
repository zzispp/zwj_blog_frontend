import { z } from "zod";

import { PUBLISHED_ENUM, REGEX } from "@/constants";

export const createSnippetSchema = z.object({
  title: z.string().min(1, { message: "长度不能少于1个字符" }),
  slug: z
    .string()
    .regex(REGEX.SLUG, {
      message: "只允许输入数字、小写字母和中横线",
    })
    .min(1, { message: "长度不能少于1个字符" }),
  description: z.string().min(1, { message: "长度不能少于1个字符" }),
  published: z.boolean().optional(),
  body: z.string().min(1, { message: "长度不能少于1个字符" }),
  tags: z.string().array().optional(),
});

export const updateSnippetSchema = createSnippetSchema.partial().extend({
  id: z.string().min(1),
});

export const getSnippetsSchema = z.object({
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
  orderBy: z.enum(["createdAt", "updatedAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type CreateSnippetDTO = z.infer<typeof createSnippetSchema>;
export type UpdateSnippetDTO = z.infer<typeof updateSnippetSchema>;
export type GetSnippetsDTO = z.infer<typeof getSnippetsSchema>;

// 定义 Snippet 类型（原来从 getSnippets 推导，现在手动定义）
export interface Snippet {
  id: string;
  title: string;
  slug: string;
  description: string;
  body: string;
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
