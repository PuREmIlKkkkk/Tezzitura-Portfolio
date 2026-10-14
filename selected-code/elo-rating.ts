// Selected excerpt from the Tezzitura team project.
// This file contains the Elo rating-related code I contributed.

import { User } from 'src/modules/usersbasics/user.entity';
import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';

@Injectable()
export class EloService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  /**
   * Calculates the new ELO ratings for two players after a match.
   *
   * @param eloA - The current ELO rating of player A.
   * @param eloB - The current ELO rating of player B.
   * @param resultA - The result of the match for player A (1 for win, 0.5 for draw, 0 for loss).
   * @returns An object containing the new ELO ratings for both players.
   */
  calculateNewElo(
    eloA: number,
    eloB: number,
    resultA: number,
  ): { newEloA: number; newEloB: number } {
    const K = 32; // constant that controls how fast ELO changes
    const expectedA = 1 / (1 + Math.pow(10, (eloB - eloA) / 400));
    const expectedB = 1 - expectedA;

    const resultB = 1 - resultA;

    const newEloA = Math.round(eloA + K * (resultA - expectedA));
    const newEloB = Math.round(eloB + K * (resultB - expectedB));

    return { newEloA, newEloB };
  }

  /**
   * Updates the Elo ratings of two users based on the result of a match.
   *
   * @param {User} userA - The first user in the match.
   * @param {User} userB - The second user in the match.
   * @param {number} resultA - The result of the match for userA.
   *                           Should be 1 if userA wins, 0.5 for a draw, and 0 if userA loses.
   * @returns {Promise<void>}
   */
  async updateElo(userAId: number, userBId: number, resultA: number) {
    const userA = await this.userRepository.findOne<User>({
      where: { id: userAId },
    });

    if (!userA) {
      console.error('UserA not found');
    }

    const userB = await this.userRepository.findOne<User>({
      where: { id: userBId },
    });

    if (!userB) {
      console.error('UserB not found');
    }

    const { newEloA, newEloB } = this.calculateNewElo(
      userA!.elo,
      userB!.elo,
      resultA,
    );

    userA!.elo = newEloA;
    userB!.elo = newEloB;

    await userA!.save();
    await userB!.save();
  }
}
