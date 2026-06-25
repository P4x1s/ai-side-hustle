# 钱途 - 找到你的副业方向

<div align="center">

![Logo](public/favicon.svg)

**帮助普通人找到适合的副业方向，开启赚钱之路**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase)](https://supabase.com/)

</div>

## 项目简介

钱途是一个帮助普通人找到副业方向的Web应用。用户通过回答一系列问题，AI会根据其情况推荐适合的副业方案，并提供详细的操作步骤。

### 核心功能

- **深度诊断** - 14个维度全面评估用户情况
- **智能推荐** - 基于用户画像匹配最适合的副业
- **AI教练** - 手把手指导用户执行副业方案
- **副业库** - 20+种副业方案，覆盖多个领域
- **用户系统** - 注册登录、个人中心、成就系统

## 技术栈

| 类别 | 技术 |
|------|------|
| **框架** | Next.js 16 (App Router) |
| **前端** | React 19, TypeScript 5 |
| **样式** | Tailwind CSS 4 |
| **状态管理** | Zustand |
| **数据库** | Supabase (PostgreSQL) |
| **认证** | Supabase Auth |
| **部署** | Vercel |

## 项目结构

```
ai-side-hustle/
├── public/                    # 静态资源
│   └── favicon.svg           # 网站图标
├── src/
│   ├── app/                   # Next.js App Router 页面
│   │   ├── page.tsx          # 首页
│   │   ├── layout.tsx        # 全局布局
│   │   ├── globals.css       # 全局样式
│   │   ├── metadata.ts       # SEO配置
│   │   ├── sitemap.ts        # 站点地图
│   │   ├── robots.ts         # 爬虫配置
│   │   ├── loading.tsx       # 加载动画
│   │   ├── error.tsx         # 错误页面
│   │   ├── not-found.tsx     # 404页面
│   │   ├── diagnose/         # 诊断页面
│   │   ├── result/           # 结果页面
│   │   ├── guide/            # AI教练页面
│   │   ├── hustle/           # 副业详情页面
│   │   ├── login/            # 登录页面
│   │   ├── register/         # 注册页面
│   │   ├── dashboard/        # 用户中心
│   │   ├── profile/          # 个人资料
│   │   ├── about/            # 关于我们
│   │   ├── privacy/          # 隐私政策
│   │   ├── contact/          # 联系我们
│   │   ├── reset-password/   # 重置密码
│   │   ├── update-password/  # 更新密码
│   │   ├── auth/             # 认证回调
│   │   └── api/              # API路由
│   ├── components/            # React组件
│   │   ├── Header.tsx        # 页头组件
│   │   ├── Feedback.tsx      # 反馈组件
│   │   └── Onboarding.tsx    # 新手引导
│   ├── contexts/              # React Context
│   │   └── AuthContext.tsx   # 认证上下文
│   ├── data/                  # 静态数据
│   │   └── hustles.ts        # 副业数据库
│   ├── hooks/                 # 自定义Hooks
│   │   ├── useLocalStorage.ts
│   │   └── useUserStorage.ts # 用户专属存储
│   └── lib/                   # 工具库
│       └── supabase.ts       # Supabase客户端
├── .env.local                # 环境变量
├── package.json              # 项目配置
├── tailwind.config.js        # Tailwind配置
├── tsconfig.json             # TypeScript配置
└── README.md                 # 项目说明
```

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/P4x1s/ai-side-hustle.git
   cd ai-side-hustle
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   
   创建 `.env.local` 文件：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
   ```

4. **启动开发服务器**
   ```bash
   npm run dev
   ```

5. **访问应用**
   
   打开浏览器访问 http://localhost:3000

### 部署到Vercel

1. 将代码推送到GitHub
2. 在Vercel导入项目
3. 配置环境变量
4. 点击部署

## 功能特性

### 1. 深度诊断

- 14个维度全面评估
- 城市类型、年龄、学历、职业状态
- 时间、技能、兴趣、经验
- 资金、风险承受、收入目标、紧急程度

### 2. 智能推荐

基于用户画像的多维度匹配算法：
- 资金匹配（权重3）
- 时间匹配（权重3）
- 技能匹配（权重2）
- 兴趣匹配（权重2）
- 收入目标匹配（权重2）
- 难度匹配（权重2）
- 城市类型匹配（权重2）
- 风险承受匹配（权重2）

### 3. AI教练

- 详细的步骤指导
- 丰富的回复内容
- 针对性建议
- 鼓励和激励

### 4. 副业库

覆盖多个领域的20+种副业方案：
- 电商类（闲鱼、拼多多、社区团购）
- 内容创作（抖音、小红书、百家号）
- 技能服务（设计、翻译、教学）
- 本地服务（烘焙、手工、跑腿）
- 教育培训（线上教学、作业辅导）

### 5. 用户系统

- 邮箱注册/登录
- 个人资料编辑
- 历史记录
- 成就系统
- 数据导出

## 页面列表

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 首页 | 产品介绍和引导 |
| `/diagnose` | 诊断 | 14题深度诊断 |
| `/result` | 结果 | 副业推荐结果 |
| `/hustle` | 详情 | 副业详细信息 |
| `/guide` | 教练 | AI教练指导 |
| `/login` | 登录 | 用户登录 |
| `/register` | 注册 | 用户注册 |
| `/dashboard` | 仪表盘 | 用户中心 |
| `/profile` | 资料 | 个人资料编辑 |
| `/about` | 关于 | 公司信息 |
| `/privacy` | 隐私 | 隐私政策 |
| `/contact` | 联系 | 联系方式 |

## 环境变量

| 变量名 | 说明 | 必填 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase项目URL | 是 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase匿名密钥 | 是 |

## 公司信息

- **公司名称**: 北京钱途科技有限公司
- **客服电话**: 400-888-8888
- **客服邮箱**: service@qiantu.app
- **工作时间**: 周一至周五 9:00-18:00

## 许可证

MIT License

## 联系方式

- 邮箱: service@qiantu.app
- 微信公众号: 钱途

---

**© 2026 北京钱途科技有限公司 版权所有**
