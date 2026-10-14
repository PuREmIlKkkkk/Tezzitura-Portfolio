# Tezzitura Project Showcase

Tezzitura is an online ear-training web application designed for music learners.  
It combines structured listening exercises with real-time multiplayer features, including matchmaking, friend-based matches, Elo ranking, and training statistics.

Live demo: https://tezzitura.dev

## Tech Stack

- Frontend: Next.js, React, TypeScript
- Backend: NestJS, PostgreSQL
- Real-time communication: Socket.IO
- Messaging: Redis Pub/Sub
- Deployment: Docker Compose, Caddy, Google Cloud
- Authentication: Google OAuth, session-based authentication

## My Contributions

My primary contributions focused on the multiplayer and backend systems:

- Implemented real-time PvP matchmaking using Socket.IO.
- Developed both standard matchmaking and mutual-friend matchmaking flows.
- Added matchmaking timeout handling and disconnect cleanup.
- Used Redis Pub/Sub to support multiplayer message broadcasting.
- Implemented match result processing and Elo rating updates.
- Added unit tests for Elo calculation and persistence logic.
- Contributed to friend-match and multiplayer interaction features.
- Deployed the application to Google Cloud using Docker Compose and Caddy.
- Configured HTTPS, reverse proxying, Google OAuth, session security, persistent storage, and database backup/recovery.

## Selected Code Samples

The `selected-code/` directory contains excerpts from the original project code that I contributed.

### 1. Real-time Matchmaking

File: `selected-code/matchmaking.ts`

Demonstrates:

- Standard two-player matchmaking
- Mutual-friend matchmaking
- Matchmaking timeout handling
- Player disconnect cleanup
- Socket.IO event-based communication

### 2. Redis Pub/Sub

File: `selected-code/redis-pubsub.ts`

Demonstrates:

- Redis publisher and subscriber clients
- Subscription to a shared game-room channel
- Forwarding Redis messages to Socket.IO rooms
- Multiplayer message broadcasting

### 3. Elo Rating System

File: `selected-code/elo-rating.ts`

Demonstrates:

- Expected-score calculation
- Win / draw / loss rating updates
- Persistence of updated player ratings

### 4. Elo Unit Tests

File: `selected-code/elo-rating.spec.ts`

Demonstrates:

- Jest unit testing
- Repository mocking
- Win / draw / loss scenarios
- Verification of rating persistence

## Deployment Architecture

The production deployment uses the following architecture:

```text
Internet
   |
   v
tezzitura.dev
   |
   v
Caddy
   |------------------|
   v                  v
Next.js            NestJS
Frontend           Backend
                      |
               ----------------
               |              |
               v              v
          PostgreSQL        Redis
