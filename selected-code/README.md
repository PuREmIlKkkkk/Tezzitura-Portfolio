# 精选代码 / Selected Code Samples

本目录包含我在 Tezzitura 团队项目中负责或参与实现的部分核心代码摘录。

This directory contains selected excerpts from my contributions to the Tezzitura team project.

这些文件并不是一个可以独立运行的完整应用，而是从原项目源码中摘取的代表性代码，用于展示我在后端与多人实时功能方面的开发工作。

These files are not intended to form a standalone runnable application. They are representative excerpts from the original project source code, selected to demonstrate my backend and real-time multiplayer contributions.

## 文件说明 / Files

### `matchmaking.ts`

中文：
- 实时双人匹配
- 好友互选匹配
- 匹配超时处理
- 玩家断线后的等待队列清理

English:
- Real-time two-player matchmaking
- Mutual-friend matchmaking
- Matchmaking timeout handling
- Disconnect cleanup

### `redis-pubsub.ts`

中文：
- Redis Publisher / Subscriber 初始化
- 游戏房间消息发布与订阅
- Redis 消息转发至 Socket.IO 房间

English:
- Redis publisher/subscriber setup
- Game-room message publishing and subscription
- Forwarding Redis messages to Socket.IO rooms

### `elo-rating.ts`

中文：
- Elo 预期胜率计算
- 胜 / 平 / 负后的积分更新
- 用户 Elo 数据持久化

English:
- Elo expected-score calculation
- Rating updates for win / draw / loss
- Persistence of updated player ratings

### `elo-rating.spec.ts`

中文：
- Elo 计算逻辑的 Jest 单元测试
- 胜 / 平 / 负场景覆盖
- Repository Mock 与保存逻辑验证

English:
- Jest unit tests for Elo calculation
- Win, draw, and loss scenarios
- Repository mocking and persistence verification

## 说明 / Note

本目录仅展示精选代码片段，不包含完整项目源码。

This directory contains selected code excerpts rather than the complete project source code.
