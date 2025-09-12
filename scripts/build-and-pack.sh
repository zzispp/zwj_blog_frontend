#!/bin/bash

# 本地构建和打包脚本
# 使用方法: ./scripts/build-and-pack.sh

set -e  # 遇到错误立即退出

echo "🚀 开始本地构建和打包..."

# 清理之前的构建
echo "🧹 清理之前的构建文件..."
rm -rf .next
rm -f dist.tar.gz

# 安装依赖（如果需要）
echo "📦 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "📥 安装依赖..."
    pnpm install
fi

# 构建项目
echo "🔨 开始构建项目..."
pnpm run build

# 检查构建是否成功
if [ ! -d ".next" ]; then
    echo "❌ 构建失败，.next 目录不存在"
    exit 1
fi

# 打包构建产物
echo "📦 打包构建产物..."
tar -czf dist.tar.gz .next public package.json pnpm-lock.yaml next.config.mjs

# 检查打包是否成功
if [ ! -f "dist.tar.gz" ]; then
    echo "❌ 打包失败"
    exit 1
fi

echo "✅ 构建和打包完成！"
echo "📄 打包文件: dist.tar.gz"
echo "📊 文件大小: $(du -h dist.tar.gz | cut -f1)"

echo ""
echo "🎉 本地构建流程完成！"
echo ""
echo "💡 手动上传到服务器命令:"
echo "   scp -i /Users/bubu/Desktop/zwj_blog.pem dist.tar.gz ubuntu@16.162.120.244:/home/ubuntu/web/zwj_blog_frontend/"
echo ""
echo "💡 登录服务器命令:"
echo "   ssh -i /Users/bubu/Desktop/zwj_blog.pem ubuntu@16.162.120.244"
