import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class GetFitnessRequestDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  age: number;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  currentWeight: number;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  targetWeight: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  durationInMonths: number;
}
