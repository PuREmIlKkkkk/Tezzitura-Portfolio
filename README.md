# Tezzitura 项目展示 / Tezzitura Project Showcase

Tezzitura 是一款面向音乐学习者的在线听音训练 Web 应用，提供结构化听音练习、实时 PvP 匹配、好友对战、Elo 排名和训练数据统计等功能。

Tezzitura is an online ear-training web application for music learners, featuring structured listening exercises, real-time PvP matchmaking, friend matches, Elo ranking, and training statistics.

## 在线演示 / Live Demo

https://tezzitura.dev

---

## 项目简介 / Project Overview

Tezzitura 通过在线听音训练帮助用户提升音高、音程、和弦等音乐听辨能力，并通过多人实时对战、好友系统和排行榜增强训练的互动性与持续性。

项目同时包含用户系统、训练记录、好友关系、实时比赛、Elo 评分和排行榜等功能。

Tezzitura helps users improve musical listening skills such as pitch, interval, and chord recognition through structured online exercises.

The application also includes user accounts, training records, friend relationships, real-time multiplayer matches, Elo-based ranking, and leaderboards.

---

## 技术栈 / Tech Stack

### 前端 / Frontend

- Next.js
- React
- TypeScript

### 后端 / Backend

- NestJS
- PostgreSQL

### 实时通信 / Real-time Communication

- Socket.IO
- Redis Pub/Sub

### 部署与基础设施 / Deployment & Infrastructure

- Docker
- Docker Compose
- Caddy
- Google Cloud Compute Engine
- Cloudflare DNS
- HTTPS / TLS

### 身份认证 / Authentication

- Session-based authentication
- Google OAuth

### 协作与开发工具 / Development & Collaboration

- Git
- GitHub
- Jira
- Scrum

---

## 我的主要贡献 / My Contributions

我主要负责或参与了项目中的多人实时功能、后端业务逻辑以及生产环境部署。

My primary contributions focused on real-time multiplayer functionality, backend business logic, and production deployment.

### 实时 PvP 匹配 / Real-time PvP Matchmaking

- 基于 Socket.IO 实现实时双人匹配。
- 实现普通匹配与好友互选匹配。
- 处理匹配超时、等待状态和玩家断线清理。
- 在匹配成功后创建游戏房间并同步对局信息。

- Implemented real-time two-player matchmaking using Socket.IO.
- Developed both standard matchmaking and mutual-friend matchmaking.
- Added matchmaking timeout handling, waiting-state management, and disconnect cleanup.
- Created game-room flows and synchronized match information after successful matchmaking.

### Redis Pub/Sub 与实时消息同步 / Redis Pub/Sub & Real-time Messaging

- 创建独立的 Redis Publisher 和 Subscriber 客户端。
- 使用 Redis Channel 发布和订阅游戏房间消息。
- 将 Redis 收到的消息转发至对应的 Socket.IO Room。
- 支持多人对局中的实时互动消息同步。

- Created separate Redis publisher and subscriber clients.
- Used Redis channels to publish and subscribe to game-room messages.
- Forwarded Redis messages to the corresponding Socket.IO rooms.
- Supported real-time multiplayer interaction and message synchronization.

### 比赛结果与 Elo 系统 / Match Results & Elo Rating System

- 根据双方比赛准确率计算比赛结果。
- 实现 Elo 预期胜率与积分更新逻辑。
- 支持胜、平、负三种比赛结果。
- 将更新后的 Elo 数据持久化至 PostgreSQL。
- 使用 Jest 为 Elo 计算和更新逻辑编写单元测试。

- Processed match results based on player accuracy.
- Implemented Elo expected-score and rating-update logic.
- Supported win, draw, and loss outcomes.
- Persisted updated Elo ratings to PostgreSQL.
- Added Jest unit tests for Elo calculation and persistence logic.

### 多人互动与好友功能 / Multiplayer Interaction & Friend Features

- 参与好友匹配、好友关系和多人互动功能开发。
- 支持比赛中的实时状态同步与互动事件。
- 参与好友申请、接受、拒绝、取消和删除等功能的联调与问题修复。

- Contributed to friend matchmaking, friend relationships, and multiplayer interaction features.
- Supported real-time match-state synchronization and interaction events.
- Participated in integration and debugging of friend requests, acceptance, rejection, cancellation, and removal flows.

### 生产环境部署 / Production Deployment

- 使用 Docker Compose 部署 Next.js、NestJS、PostgreSQL、Redis 和 Caddy。
- 将项目部署至 Google Cloud Compute Engine。
- 配置 `tezzitura.dev` 域名和 Cloudflare DNS。
- 使用 Caddy 配置 HTTPS 与反向代理。
- 配置 Google OAuth 与生产环境 Session Cookie 安全策略。
- 为 PostgreSQL 和用户上传头像配置持久化存储。
- 完成 PostgreSQL 数据库备份与恢复测试。
- 检查公网端口暴露，确保数据库和 Redis 不直接暴露至公网。

- Deployed Next.js, NestJS, PostgreSQL, Redis, and Caddy using Docker Compose.
- Hosted the application on Google Cloud Compute Engine.
- Configured the `tezzitura.dev` domain and Cloudflare DNS.
- Configured HTTPS and reverse proxying with Caddy.
- Configured Google OAuth and secure production session cookies.
- Added persistent storage for PostgreSQL and user-uploaded profile images.
- Performed PostgreSQL backup and recovery testing.
- Verified public port exposure so PostgreSQL and Redis remain isolated from the public internet.

---

## 精选代码 / Selected Code Samples

`selected-code/` 目录包含我在原项目中负责或参与实现的部分代表性代码摘录。

The `selected-code/` directory contains representative excerpts from the original project code that I contributed to.

### 1. 实时匹配 / Real-time Matchmaking

文件 / File:

`selected-code/matchmaking.ts`

展示内容 / Demonstrates:

- 实时双人匹配 / Real-time two-player matchmaking
- 好友互选匹配 / Mutual-friend matchmaking
- 匹配超时处理 / Matchmaking timeout handling
- 玩家断线清理 / Disconnect cleanup
- Socket.IO 事件通信 / Socket.IO event-based communication

### 2. Redis Pub/Sub

文件 / File:

`selected-code/redis-pubsub.ts`

展示内容 / Demonstrates:

- Redis Publisher / Subscriber 初始化
- Redis Publisher / Subscriber initialization
- 游戏房间消息发布与订阅 / Game-room message publishing and subscription
- Redis 消息转发至 Socket.IO Room / Forwarding Redis messages to Socket.IO rooms
- 实时多人消息广播 / Real-time multiplayer message broadcasting

### 3. Elo 评分系统 / Elo Rating System

文件 / File:

`selected-code/elo-rating.ts`

展示内容 / Demonstrates:

- Elo 预期胜率计算 / Elo expected-score calculation
- 胜 / 平 / 负积分更新 / Rating updates for win, draw, and loss
- 用户 Elo 数据持久化 / Elo rating persistence

### 4. Elo 单元测试 / Elo Unit Tests

文件 / File:

`selected-code/elo-rating.spec.ts`

展示内容 / Demonstrates:

- Jest 单元测试 / Jest unit testing
- Repository Mock
- 胜 / 平 / 负测试场景 / Win, draw, and loss scenarios
- 数据保存逻辑验证 / Persistence verification

更多说明请查看：

For more details, see:

`selected-code/README.md`

---

## 部署架构 / Deployment Architecture

```text
                         Internet
                            |
                            v
                    https://tezzitura.dev
                            |
                            v
                          Caddy
                    HTTPS / Reverse Proxy
                       /           \
                      /             \
                     v               v
               Next.js            NestJS
               Frontend           Backend
                                     |
                         -------------------------
                         |                       |
                         v                       v
                    PostgreSQL                 Redis
                    Persistent               Pub/Sub
                     Storage
```

生产环境中的所有服务均通过 Docker Compose 运行。

All production services run through Docker Compose.

Caddy 是唯一直接接收 Web 流量的应用入口，负责 HTTPS 与反向代理。

Caddy acts as the main public web entry point and handles HTTPS termination and reverse proxying.

PostgreSQL、Redis、Frontend 和 Backend 均运行在 Docker 内部网络中，不直接向公网暴露业务端口。

PostgreSQL, Redis, the frontend, and the backend run inside the Docker network without directly exposing their service ports to the public internet.

---

## 项目截图 / Screenshots

项目截图将展示在 `screenshots/` 目录中。

Project screenshots are available in the `screenshots/` directory.

计划展示 / Planned screenshots:

- 首页与训练功能 / Home and training interface
- PvP 实时对战 / Real-time PvP match
- 排行榜与 Elo / Leaderboard and Elo ranking
- 好友系统 / Friend system

---

## 项目说明 / Repository Note

本仓库用于求职和个人作品展示。

This repository is intended for portfolio and recruiting purposes.

由于 Tezzitura 原项目为团队协作开发项目，本仓库不会公开完整项目源码，仅展示我负责或参与开发的部分代表性代码摘录、项目说明、架构和截图。

Because the original Tezzitura application was developed as a team project, this repository does not contain the complete project source code. It only includes selected excerpts from code I contributed to, along with project documentation, architecture, and screenshots.

精选代码文件保持原项目实现逻辑，仅进行必要的片段截取和展示说明。

The selected code samples preserve the implementation logic of the original project and are presented as excerpts for portfolio purposes.
