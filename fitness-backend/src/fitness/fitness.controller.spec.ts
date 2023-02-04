import { Test, TestingModule } from '@nestjs/testing';
import { FitnessController } from './fitness.controller';
import { FitnessService } from './fitness.service';

describe('FitnessController', () => {
  let controller: FitnessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FitnessController],
      providers: [FitnessService],
    }).compile();

    controller = module.get<FitnessController>(FitnessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
