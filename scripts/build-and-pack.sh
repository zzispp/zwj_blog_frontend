#!/bin/bash

# 本地构建和打包脚本
# 使用方法: ./scripts/build-and-pack.sh [服务器地址]

set -e  # 遇到错误立即退出

echo "🚀 开始本地构建和打包..."

# 检查是否提供了服务器地址
SERVER_ADDRESS=${1:-""}

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
pnpm run build:low-memory

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

# 如果提供了服务器地址，询问是否上传
if [ ! -z "$SERVER_ADDRESS" ]; then
    echo ""
    read -p "🚀 是否立即上传到服务器 $SERVER_ADDRESS? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "📤 上传到服务器..."
        scp dist.tar.gz ubuntu@$SERVER_ADDRESS:/home/ubuntu/web/zwj_blog_frontend/
        echo "✅ 上传完成！"
        echo "💡 现在可以在服务器上运行部署脚本: ./scripts/deploy.sh"
    fi
fi

echo ""
echo "🎉 本地构建流程完成！"
