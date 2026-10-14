# 系统架构 / System Architecture

Tezzitura 的生产环境部署于 Google Cloud Compute Engine，并通过 Docker Compose 管理各个服务。

Tezzitura is deployed on Google Cloud Compute Engine, with services orchestrated using Docker Compose.

Caddy 是唯一直接接收 Web 流量的应用入口，负责 HTTPS 与反向代理。

Caddy acts as the main public web entry point and handles HTTPS termination and reverse proxying.

PostgreSQL、Redis、Frontend 和 Backend 均运行在 Docker 内部网络中，不直接向公网暴露业务端口。

PostgreSQL, Redis, the frontend, and the backend run inside the Docker network without directly exposing their service ports to the public internet.
