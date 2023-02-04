import { Module } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { FitnessService } from './fitness.service';
import { FitnessController } from './fitness.controller';

const getOpenAiKeyOrThrow = () => {
  const openAiKey = process.env.OPENAI_API_KEY;
  if (!openAiKey) {
    throw new Error('OpenAI API key not specified');
  }
  return openAiKey;
};

const buildOpenAiClient = () => {
  const openAiKey = getOpenAiKeyOrThrow();
  const configuration = new Configuration({
    apiKey: openAiKey,
  });
  const openAiClient = new OpenAIApi(configuration);
  return openAiClient;
};

@Module({
  controllers: [FitnessController],
  providers: [
    {
      provide: FitnessService,
      useFactory: () => {
        const openAiClient = buildOpenAiClient();
        return new FitnessService(openAiClient);
      },
    },
  ],
})
export class FitnessModule {}
