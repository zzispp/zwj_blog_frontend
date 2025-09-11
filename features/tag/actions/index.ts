"use server";

import { type Prisma, TagTypeEnum } from "@prisma/client";

import { ERROR_NO_PERMISSION } from "@/constants";
import { noPermission } from "@/features/user";
import { prisma } from "@/lib/prisma";
import { getSkip } from "@/utils";

import {
  type CreateTagDTO,
  type GetTagsDTO,
  type UpdateTagDTO,
  createTagSchema,
  getTagsSchema,
  updateTagSchema,
} from "../types";

// isTagExistByID 已迁移到后端接口，由 GET /api/tags/{id}/exists 处理

// getTags 已迁移到后端接口，由 /api/tags/list 处理

// getAllTags 已迁移到后端接口，由 /api/tags/all 处理

// createTag 已迁移到后端接口，由 /api/tags/create 处理

// deleteTagByID 已迁移到后端接口，由 DELETE /api/tags/{id} 处理

// updateTag 已迁移到后端接口，由 PUT /api/tags/{id} 处理

// getTagByID 已迁移到后端接口，由 GET /api/tags/{id} 处理
