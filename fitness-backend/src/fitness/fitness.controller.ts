import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  UsePipes,
  ParseIntPipe,
} from '@nestjs/common';
import { FitnessService } from './fitness.service';
import { GetFitnessRequestDto } from './dto/get-fitness.dto';

@Controller('fitness')
@UsePipes(new ValidationPipe({ transform: true }))
export class FitnessController {
  constructor(private readonly fitnessService: FitnessService) {}

  @Get('/fitness-advice')
  getFitnessAdvice(@Query() params: GetFitnessRequestDto) {
    console.log(`Inside FitnessController new ${JSON.stringify(params)} `);
    return this.fitnessService.getFitnessAdvice(params);
  }
}
