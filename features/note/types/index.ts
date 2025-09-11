import { z } from "zod";

import { PUBLISHED_ENUM } from "@/constants";

export const createNoteSchema = z.object({
  body: z.string().min(1, { message: "长度不能少于1个字符" }),
  published: z.boolean().optional(),
  tags: z.string().array().optional(),
});

export const updateNoteSchema = createNoteSchema.partial().extend({
  id: z.string().min(1),
});

export const getNotesSchema = z.object({
  body: z.string().optional(),
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

export type CreateNoteDTO = z.infer<typeof createNoteSchema>;
export type UpdateNoteDTO = z.infer<typeof updateNoteSchema>;
export type GetNotesDTO = z.infer<typeof getNotesSchema>;

// 定义 Note 类型（原来从 getNotes 推导，现在手动定义）
export interface Note {
  id: string;
  title: string;
  slug: string;
  description?: string;
  body: string;
  published: boolean;
  tags: Array<{
    id: string;
    name: string;
    slug: string;
    type: string;
    icon?: string | null;
    iconDark?: string | null;
    createdAt?: string;
    updatedAt?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
