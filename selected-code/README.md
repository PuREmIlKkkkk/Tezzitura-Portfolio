# 精选代码 / Selected Code Samples

本目录包含我在 Tezzitura 团队项目中负责或参与实现的部分核心代码摘录。

This directory contains selected excerpts from my contributions to the Tezzitura team project.

这些文件并不是一个可以独立运行的完整应用，而是从原项目源码中摘取的代表性代码，用于展示我在后端与多人实时功能方面的开发工作。

These files are not intended to form a standalone runnable application. They are representative excerpts from the original project source code, selected to demonstrate my backend and real-time multiplayer contributions.

## 文件说明 / Files

### `matchmaking.ts`

- 实时双人匹配 / Real-time two-player matchmaking
- 好友互选匹配 / Mutual-friend matchmaking
- 匹配超时处理 / Matchmaking timeout handling
- 玩家断线后的等待队列清理 / Disconnect cleanup

### `redis-pubsub.ts`

- Redis Publisher/Subscriber初始化 / Redis publisher/subscriber setup
- 游戏房间消息发布与订阅 / Game-room message publishing and subscription
- Redis 消息转发至 Socket.IO 房间 / Forwarding Redis messages to Socket.IO rooms

### `elo-rating.ts`

- Elo预期胜率计算 / Elo expected-score calculation
- 胜 / 平 / 负后的积分更新 / Rating updates for win / draw / loss
- 用户Elo数据持久化 / Persistence of updated player ratings

### `elo-rating.spec.ts`

- Elo计算逻辑的Jest单元测试 / Jest unit tests for Elo calculation
- 胜 / 平 / 负场景覆盖 / Win, draw, and loss scenarios
- Repository Mock 与保存逻辑验证 / Repository mocking and persistence verification
