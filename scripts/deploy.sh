#!/bin/bash

# 服务器部署脚本
# 使用方法: ./scripts/deploy.sh

set -e  # 遇到错误立即退出

echo "🚀 开始服务器部署..."

# 检查当前目录
CURRENT_DIR=$(pwd)
echo "📁 当前目录: $CURRENT_DIR"

# 检查 dist.tar.gz 是否存在
if [ ! -f "dist.tar.gz" ]; then
    echo "❌ 找不到 dist.tar.gz 文件"
    echo "💡 请先上传构建文件到当前目录"
    exit 1
fi

# 显示文件信息
echo "📊 部署文件大小: $(du -h dist.tar.gz | cut -f1)"

# 备份当前版本（如果存在）
if [ -d ".next" ]; then
    echo "💾 备份当前版本..."
    BACKUP_NAME="backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p backups
    tar -czf "backups/${BACKUP_NAME}.tar.gz" .next public package.json 2>/dev/null || true
    echo "✅ 备份完成: backups/${BACKUP_NAME}.tar.gz"
fi

# 解压新版本
echo "📦 解压新版本..."
tar -xzf dist.tar.gz

# 检查解压是否成功
if [ ! -d ".next" ]; then
    echo "❌ 解压失败，.next 目录不存在"
    exit 1
fi

# 安装生产依赖
echo "📥 安装生产依赖..."
pnpm install --prod --frozen-lockfile --ignore-scripts

# PM2 应用名称
APP_NAME="zwj-blog"

# 检查 PM2 是否已安装
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装 PM2..."
    npm install -g pm2
fi

# 停止现有的 PM2 进程
echo "🛑 停止现有服务..."
pm2 stop $APP_NAME 2>/dev/null || echo "ℹ️  没有找到运行中的 $APP_NAME 进程"
pm2 delete $APP_NAME 2>/dev/null || echo "ℹ️  没有找到 $APP_NAME 进程"

# 启动新服务
echo "▶️  启动新服务..."
pm2 start npm --name $APP_NAME -- start

# 保存 PM2 配置
pm2 save

# 显示服务状态
echo ""
echo "📊 服务状态:"
pm2 status

# 显示最近日志
echo ""
echo "📝 最近日志:"
pm2 logs $APP_NAME --lines 10 --nostream

# 清理部署文件
echo ""
read -p "🗑️  是否删除部署文件 dist.tar.gz? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -f dist.tar.gz
    echo "✅ 部署文件已清理"
fi

echo ""
echo "🎉 部署完成！"
echo "💡 使用以下命令管理服务:"
echo "   pm2 status           - 查看状态"
echo "   pm2 logs $APP_NAME   - 查看日志"
echo "   pm2 restart $APP_NAME - 重启服务"
echo "   pm2 stop $APP_NAME    - 停止服务"
