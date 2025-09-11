import { TagTypeEnum } from "@prisma/client";
import { z } from "zod";

import { REGEX } from "@/constants";

export const createTagSchema = z.object({
  name: z.string().min(1, { message: "长度不能少于1个字符" }),
  slug: z
    .string()
    .regex(REGEX.SLUG, { message: "只允许输入数字、小写字母和中横线" })
    .min(1, { message: "长度不能少于1个字符" }),
  type: z.enum([
    TagTypeEnum.ALL,
    TagTypeEnum.BLOG,
    TagTypeEnum.NOTE,
    TagTypeEnum.SNIPPET,
  ]),
  icon: z.string().optional(),
  iconDark: z.string().optional(),
});

export const updateTagSchema = createTagSchema.partial().extend({
  id: z.string().min(1),
});

export const getTagsSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  type: z
    .enum([
      TagTypeEnum.ALL,
      TagTypeEnum.BLOG,
      TagTypeEnum.NOTE,
      TagTypeEnum.SNIPPET,
    ])
    .optional(),
  pageIndex: z.number(),
  pageSize: z.number(),
  orderBy: z.enum(["createdAt", "updatedAt"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export type CreateTagDTO = z.infer<typeof createTagSchema>;
export type UpdateTagDTO = z.infer<typeof updateTagSchema>;
export type GetTagsDTO = z.infer<typeof getTagsSchema>;

// 定义 Tag 类型（原来从 getTags 推导，现在手动定义）
export interface Tag {
  id: string;
  name: string;
  slug: string;
  type: TagTypeEnum;
  icon?: string | null;
  iconDark?: string | null;
  createdAt?: string;
  updatedAt?: string;
  // 关联数据（如果需要的话）
  blogs?: any[];
  notes?: any[];
  snippets?: any[];
  _count?: {
    blogs: number;
    notes: number;
    snippets: number;
  };
}
