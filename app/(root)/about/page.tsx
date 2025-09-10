import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import {
  IconSkillGolang,
  IconSkillTypeScript,
  IconSkillReactDark,
  IconSkillReactLight,
  IconSkillNextjsDark,
  IconSkillNextjsLight,
  IconSkillMysqlDark,
  IconSkillMysqlLight,
  IconSkillDocker,
  IconSkillGmailDark,
  IconSkillGmailLight,
  IconSkillNginx,
  IconSkillPrisma,
} from "@/components/icons";

import { NICKNAME, EMAIL } from "@/constants";
import { cn } from "@/lib/utils";

export const revalidate = 60;



const skillCategories = [
  {
    title: "Web3 & 区块链",
    description: "专注区块链应用开发",
    skills: [
      { name: "Solana", level: "专精", color: "from-green-500 to-emerald-500" },
      { name: "Ethereum", level: "熟练", color: "from-blue-500 to-cyan-500" },
      { name: "Rust", level: "专精", color: "from-orange-500 to-red-500" },
      { name: "Solidity", level: "熟练", color: "from-purple-500 to-pink-500" },
      { name: "DeFi", level: "专精", color: "from-indigo-500 to-purple-500" },
      { name: "NFT", level: "熟练", color: "from-pink-500 to-rose-500" },
      { name: "MEV", level: "熟练", color: "from-yellow-500 to-orange-500" },
    ]
  },
  {
    title: "后端开发",
    description: "构建高性能服务端应用",
    skills: [
      { name: "Golang", level: "专精", color: "from-blue-400 to-blue-600", icon: IconSkillGolang },
      { name: "Node.js", level: "熟练", color: "from-green-400 to-green-600" },
      { name: "MySQL", level: "熟练", color: "from-orange-400 to-orange-600", icon: IconSkillMysqlDark },
      { name: "PostgreSQL", level: "熟练", color: "from-blue-500 to-indigo-500" },
      { name: "Redis", level: "熟练", color: "from-red-400 to-red-600" },
      { name: "Docker", level: "熟练", color: "from-blue-400 to-blue-500", icon: IconSkillDocker },
    ]
  },
  {
    title: "前端开发",
    description: "创建现代化用户界面",
    skills: [
      { name: "TypeScript", level: "专精", color: "from-blue-500 to-blue-700", icon: IconSkillTypeScript },
      { name: "React", level: "专精", color: "from-cyan-400 to-blue-500", icon: IconSkillReactDark },
      { name: "Next.js", level: "专精", color: "from-gray-700 to-gray-900", icon: IconSkillNextjsDark },
      { name: "Tailwind CSS", level: "熟练", color: "from-cyan-400 to-teal-500" },
      { name: "Framer Motion", level: "熟练", color: "from-purple-400 to-pink-500" },
    ]
  }
];

const projects = [
  {
    title: "Meme 交易平台",
    description: "基于 Solana 的去中心化 Meme 代币交易平台，支持快速交易和流动性挖矿",
    tech: ["Solana", "Rust", "React", "TypeScript"],
    features: ["实时价格监控", "自动化交易", "流动性池管理"]
  },
  {
    title: "代币狙击机器人",
    description: "高频交易机器人，专门用于新代币上市时的快速买入策略",
    tech: ["Golang", "WebSocket", "Blockchain API"],
    features: ["毫秒级响应", "智能滑点控制", "风险管理"]
  },
  {
    title: "NFT 市场平台",
    description: "多链 NFT 交易市场，支持铸造、交易和拍卖功能",
    tech: ["Next.js", "Ethereum", "IPFS", "Web3.js"],
    features: ["多链支持", "批量操作", "版税分配"]
  },
  {
    title: "MEV 套利系统",
    description: "跨 DEX 套利系统，利用价格差异进行自动化套利交易",
    tech: ["Rust", "Flashbots", "DeFi Protocol"],
    features: ["跨链套利", "闪电贷集成", "收益优化"]
  }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        <div className="space-y-20 animate-in fade-in duration-700">
          {/* Hero Section */}
          <div className="text-center space-y-6 animate-in slide-in-from-bottom-4 duration-500 delay-100">
            <h1
              className={cn(
                "text-4xl md:text-6xl font-black tracking-tight",
                "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text"
              )}
              style={{
                WebkitTextFillColor: "transparent",
              }}
            >
             GMGN.RS
            </h1>
          </div>

          {/* About Me */}
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-200">
            <Card className="border-0 bg-gradient-to-br from-background/80 to-muted/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl flex items-center gap-3">
                  PuPu
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  一名 <span className="font-semibold text-primary">区块链开发工程师</span>，
                  专注于 Solana 生态系统开发，同时也熟悉以太坊等 EVM 链的开发。
                  相信 <span className="font-semibold text-primary">Solana 将改变世界</span>，
                  致力于在 Web3 领域构建有价值的应用。
                </p>
                <p>
                  除了区块链开发，我也热爱传统的 Web 开发，
                  擅长使用现代技术栈创建 <span className="font-semibold text-primary">高性能、用户友好</span> 的应用程序。
                  喜欢探索新技术，分享知识，与开发者社区一起成长。
                </p>
                <p>
                  在这个快速发展的 Web3 时代，始终保持学习的热情，
                  <span className="font-semibold text-primary">24/7 不停歇地在区块链世界构建未来</span> 🌅🌙
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Skills */}
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 delay-300">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">技术技能</h2>
              <p className="text-lg text-muted-foreground">掌握的技术栈与专业领域</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="space-y-4 animate-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${400 + categoryIndex * 100}ms` }}
                >
                  <Card className="h-full border-0 bg-gradient-to-br from-background/60 to-muted/20 hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.skills.map((skill, skillIndex) => (
                          <div
                            key={skillIndex}
                            className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-muted/50 to-muted/20 hover:from-muted/70 hover:to-muted/30 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              {skill.icon && (
                                <skill.icon className="w-5 h-5" />
                              )}
                              <span className="font-medium">{skill.name}</span>
                            </div>
                            <Badge
                              className={cn(
                                "text-xs font-semibold text-white border-0",
                                `bg-gradient-to-r ${skill.color}`
                              )}
                            >
                              {skill.level}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 delay-500">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">项目经验</h2>
              <p className="text-lg text-muted-foreground">参与和主导的重要项目</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="group animate-in slide-in-from-bottom-4 duration-500 hover:scale-102 transition-transform"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <Card className="h-full border-0 bg-gradient-to-br from-background/60 to-muted/20 hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">核心功能：</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {project.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">技术栈：</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="animate-in slide-in-from-bottom-4 duration-500 delay-700">
            <Card className="border-0 bg-gradient-to-br from-primary/5 via-background/80 to-accent/5 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl flex items-center justify-center gap-3">
                  <span className="text-2xl">📧</span>
                  联系我
                </CardTitle>
                <CardDescription className="text-base">
                  欢迎交流技术、合作机会或任何有趣的想法
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <div className="flex items-center space-x-4 p-4 rounded-xl bg-background/50 backdrop-blur-sm">
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Link href={`mailto:${EMAIL}`} target="_blank">
                      <IconSkillGmailDark className="text-base dark:hidden" />
                      <IconSkillGmailLight className="hidden text-base dark:inline-block" />
                    </Link>
                  </Button>
                  <div>
                    <p className="font-medium">{EMAIL}</p>
                    <p className="text-sm text-muted-foreground">点击发送邮件</p>
                  </div>
                </div>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    让我们一起在 Web3 的世界中创造更多可能 ✨
                  </p>
                  <p className="text-xs text-muted-foreground">
                    GM & GN - Good Morning & Good Night 🌅🌙
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}