// Selected excerpt from the Tezzitura team project.
// This file contains the Redis Pub/Sub-related code I contributed.

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { createClient, RedisClientType } from 'redis';
import { generateList } from '../exercises/exercises.service';
import { CustomSocket, GameroomRecord } from './socket.interface';
import { EloService } from '../elo/elo.service';

type Exercise = {
  type: string;
  note1: string;
  note2?: string;
  note3?: string;
  answer: string;
  difficulty: number;
};

@Injectable()
export class GameroomsService implements OnModuleInit {
  private pubClient: RedisClientType;
  private subClient: RedisClientType;
  private server: Server;
  private subscribed = false;

  constructor(private readonly eloService: EloService) {}

  async onModuleInit() {
    // Create Redis publisher and subscriber
    const redisUrl = `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || '6379'}`;
    Logger.log('Redis: ' + redisUrl);
    this.pubClient = createClient({
      url: redisUrl,
    });
    this.subClient = createClient({
      url: redisUrl,
    });

    await this.pubClient.connect();
    await this.subClient.connect();

    console.log('Redis publisher and subscriber connected');
  }

  // This is called by the gateway to assign the server instance
  async setServer(server: Server) {
    this.server = server;

    if (!this.subscribed) {
      this.subscribed = true;
      // Listen for messages from Redis
      await this.subClient.subscribe('gameroomChannel', (data) => {
        console.log(`Received message from Redis: ${data}`);

        // Broadcast message to the corresponding WebSocket room
        const { username, content, roomId } = JSON.parse(data) as {
          username: string;
          content: string;
          roomId: string;
        };

        if (this.server) {
          this.server.to(roomId).emit('gameMessage', {
            username,
            content,
          });
        } else {
          console.error('Server instance is not initialized');
        }
      });
    }
  }

  // Publish messages to Redis
  async publishMessage(roomId: string, username: string, content: string) {
    const message = JSON.stringify({ roomId, username, content });
    await this.pubClient.publish('gameroomChannel', message);
  }
}
