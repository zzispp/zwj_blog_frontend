"use server";

import { hashSync } from "bcryptjs";

import { ADMIN_EMAILS } from "@/constants";
import { type SignupDTO, signupSchema } from "@/features/auth";
// 临时禁用 auth 导入
import { prisma } from "@/lib/prisma";

export const createUser = async (params: SignupDTO) => {
  const result = await signupSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors.join(";");
    // TODO: 记录日志
    throw new Error(error);
  }

  const isExist = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  });

  if (isExist) {
    throw new Error("当前邮箱已注册！");
  }

  const hashedPassword = hashSync(result.data.password);
  await prisma.user.create({
    data: {
      name: result.data.name,
      password: hashedPassword,
      email: result.data.email,
    },
  });
};

export const noPermission = async () => {
  // 临时禁用权限检查，直接返回有权限
  // TODO: 实现基于 Solana 钱包地址的权限检查
  return false;
};
