// Selected excerpt from the Tezzitura team project.
// This file contains the unit tests for the Elo rating logic I contributed.

/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EloService } from './elo.service';
import { USER_REPOSITORY } from 'src/core/constants';

describe('EloService', () => {
  let service: EloService;
  const mockUserRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EloService,
        { provide: USER_REPOSITORY, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<EloService>(EloService);
  });

  it('should calculate new ELO ratings correctly when player A wins', () => {
    const result = service.calculateNewElo(1600, 1400, 1);
    expect(result.newEloA).toBeGreaterThan(1600);
    expect(result.newEloB).toBeLessThan(1400);
  });

  it('should calculate new ELO ratings correctly when players draw', () => {
    const result = service.calculateNewElo(1600, 1400, 0.5);
    expect(result.newEloA).toBeLessThan(1600);
    expect(result.newEloB).toBeGreaterThan(1400);
  });

  it('should calculate new ELO ratings correctly when player A loses', () => {
    const result = service.calculateNewElo(1600, 1400, 0);
    expect(result.newEloA).toBeLessThan(1600);
    expect(result.newEloB).toBeGreaterThan(1400);
  });

  it('should update ELO ratings correctly when player A wins', async () => {
    // Set up dummy user objects with a save method
    const userA = { elo: 1600, save: jest.fn().mockResolvedValue(true) };
    const userB = { elo: 1400, save: jest.fn().mockResolvedValue(true) };

    mockUserRepository.findOne
      .mockResolvedValueOnce(userA) // for userA
      .mockResolvedValueOnce(userB); // for userB

    // Call updateElo with a win result (resultA = 1)
    await service.updateElo(1, 2, 1);

    // Expect Elo values updated and save called
    expect(userA.elo).toBeGreaterThan(1600);
    expect(userB.elo).toBeLessThan(1400);
    expect(userA.save).toHaveBeenCalled();
    expect(userB.save).toHaveBeenCalled();
  });

  it('should update ELO ratings correctly when players draw', async () => {
    // Set up dummy user objects with a save method
    const userA = { elo: 1600, save: jest.fn().mockResolvedValue(true) };
    const userB = { elo: 1400, save: jest.fn().mockResolvedValue(true) };

    mockUserRepository.findOne
      .mockResolvedValueOnce(userA) // for userA
      .mockResolvedValueOnce(userB); // for userB

    // Call updateElo with a draw result (resultA = 0.5)
    await service.updateElo(1, 2, 0.5);

    // Expect Elo values updated and save called
    expect(userA.elo).toBeLessThan(1600);
    expect(userB.elo).toBeGreaterThan(1400);
    expect(userA.save).toHaveBeenCalled();
    expect(userB.save).toHaveBeenCalled();
  });

  it('should update ELO ratings correctly when player A loses', async () => {
    // Set up dummy user objects with a save method
    const userA = { elo: 1600, save: jest.fn().mockResolvedValue(true) };
    const userB = { elo: 1400, save: jest.fn().mockResolvedValue(true) };

    mockUserRepository.findOne
      .mockResolvedValueOnce(userA) // for userA
      .mockResolvedValueOnce(userB); // for userB

    // Call updateElo with a lose result (resultA = 0)
    await service.updateElo(1, 2, 0);

    // Expect Elo values updated and save called
    expect(userA.elo).toBeLessThan(1600);
    expect(userB.elo).toBeGreaterThan(1400);
    expect(userA.save).toHaveBeenCalled();
    expect(userB.save).toHaveBeenCalled();
  });
});
