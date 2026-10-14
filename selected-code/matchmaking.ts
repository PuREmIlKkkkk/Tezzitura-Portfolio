// Selected excerpt from the Tezzitura team project.
// This file contains the matchmaking-related code I contributed.
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { GameroomsService } from './gamerooms.service';
import { CustomSocket } from './socket.interface';
import { GameroomRecord } from './socket.interface';

// Represents a player who is waiting for a mutual match (typically friends)
interface WaitingMutual {
  id: number;
  client: CustomSocket;
  mutuals: number[];
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_DOMAIN || 'http://localhost:3000',
    credentials: true,
  },
})
export class GameroomsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private waitingMutuals: WaitingMutual[] = [];
  private waitingPlayer: CustomSocket | null = null;
  private timeoutDuration = 30000;
  private roomId: string | null = null;

  private gameroomRecords: GameroomRecord[] = [];

  constructor(private readonly gameroomsService: GameroomsService) {}

  async handleConnection(client: CustomSocket) {
    console.log(`User connected: ${client.id}`);
    await this.gameroomsService.setServer(this.server);
  }

  handleDisconnect(client: CustomSocket) {
    console.log(`User disconnect: ${client.id}`);
    if (this.waitingPlayer?.id === client.id) {
      this.waitingPlayer = null;
    }

    // Remove player from waitingMutuals
    this.waitingMutuals = this.waitingMutuals.filter(
      (player) => player.client.id !== client.id,
    );

    const record = this.gameroomRecords.find(
      (gameRecord) => gameRecord.roomId == client.data.roomId,
    );

    if (record) {
      if (
        !record.player1 ||
        (record.player1.id != client.id && !record.player2)
      ) {
        // Someone leave early, no result.
        this.server.to(record.roomId).emit('opponentLeft', {
          opponentId: client.id,
        });

        const index = this.gameroomRecords.findIndex(
          (gameroomRecord) => gameroomRecord.roomId == client.data.roomId,
        );

        if (index != -1) {
          this.gameroomRecords.splice(index, 1);
        }
      }
    } else {
      console.error('Record not found!');
    }
  }

  @SubscribeMessage('findMatch')
  async handleFindMatch(client: CustomSocket, data: string) {
    console.log(`User ${client.id} is searching for a match`);
    const parsedData = JSON.parse(data) as {
      username: string;
      id: number;
      avatarURL: string;
      lessonId: number;
    };

    client.data.avatarURL = parsedData.avatarURL;
    client.data.username = parsedData.username;
    client.data.userId = parsedData.id;

    if (this.waitingPlayer) {
      // If another user is waiting, match them
      const player1 = this.waitingPlayer;
      const player2 = client;
      this.waitingPlayer = null;

      // Start game
      this.gameroomsService.startGame(
        this.server,
        player1,
        player2,
        parsedData.lessonId,
        this.gameroomRecords,
      );
    } else {
      // No player is waiting, then add to waiting pool
      this.waitingPlayer = client;
      console.log(`User ${client.id} is waiting for a match`);

      // Set timeout to remove player after a certain time
      setTimeout(() => {
        // Make sure there's no race condition, e.g., a second player joins before calling SetTimeou()
        if (this.waitingPlayer?.id === client.id) {
          console.log(`Matchmaking timeout for player ${client.id}`);
          this.waitingPlayer = null;

          // Send a message back to the client, frontend use this to inform
          client.emit('matchTimeout', 'No match found. Please try again');
        }
      }, this.timeoutDuration);
    }
  }

  @SubscribeMessage('findMutualMatch')
  async handleFindMutualMatch(client: CustomSocket, data: string) {
    console.log(`User ${client.id} is searching for a mutual match`);
    const { username, id, avatarURL, lessonId, mutuals } = JSON.parse(data) as {
      username: string;
      id: number;
      avatarURL: string;
      lessonId: number;
      mutuals: number[];
    };

    client.data.avatarURL = avatarURL;
    client.data.username = username;
    client.data.userId = id;

    // Check if mutuals are in the waiting pool
    const mutualPlayer = this.waitingMutuals.find(
      (mutualMatch) =>
        mutualMatch.mutuals.includes(id) && mutuals.includes(mutualMatch.id),
    );

    if (mutualPlayer) {
      // If mutuals are found, match them
      const player1 = mutualPlayer.client;
      const player2 = client;
      this.waitingMutuals = this.waitingMutuals.filter(
        (player) => player.client.id !== player1.id,
      );

      // Start game
      this.gameroomsService.startGame(
        this.server,
        player1,
        player2,
        lessonId,
        this.gameroomRecords,
      );
    } else {
      // No mutuals found, add to waiting pool
      this.waitingMutuals.push({ id, client, mutuals });
      console.log(`User ${id} is waiting for mutual match`);

      // Set timeout to remove player after a certain time
      setTimeout(() => {
        // Make sure there's no race condition, e.g., a second player joins before calling SetTimeou()
        if (
          this.waitingMutuals.some((player) => player.client.id === client.id)
        ) {
          console.log(`Mutual matchmaking timeout for player ${client.id}`);
          this.waitingMutuals = this.waitingMutuals.filter(
            (player) => player.client.id !== client.id,
          );

          // Send a message back to the client, frontend use this to inform
          client.emit(
            'matchTimeout',
            'No mutual match found. Please try again',
          );
        }
      }, this.timeoutDuration);
    }
  }
}
