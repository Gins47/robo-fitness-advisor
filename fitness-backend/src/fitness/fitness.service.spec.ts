import { Test, TestingModule } from '@nestjs/testing';
import { FitnessService } from './fitness.service';

describe('FitnessService', () => {
  let service: FitnessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FitnessService],
    }).compile();

    service = module.get<FitnessService>(FitnessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
