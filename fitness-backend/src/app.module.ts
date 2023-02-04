import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FitnessModule } from './fitness/fitness.module';

@Module({
  imports: [ConfigModule.forRoot(), FitnessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
