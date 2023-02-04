import { Injectable } from '@nestjs/common';
import {
  CreateCompletionRequest,
  CreateCompletionResponse,
  OpenAIApi,
} from 'openai';

import { GetFitnessRequestDto } from './dto/get-fitness.dto';

@Injectable()
export class FitnessService {
  constructor(private readonly openApiClient: OpenAIApi) {}

  private generatePrompt(getFitnessDto: GetFitnessRequestDto) {
    return ` I am ${getFitnessDto.age} years old ${getFitnessDto.gender} and has ${getFitnessDto.currentWeight} kg. I would like to ${getFitnessDto.action} my weight to ${getFitnessDto.targetWeight} kg in ${getFitnessDto.durationInMonths} months. Suggest me a proper workout plan with corresponding diet plan and also 5 food recipes.`;
  }

  private buildRequest = (
    getFitnessDto: GetFitnessRequestDto,
  ): CreateCompletionRequest => {
    const prompt = this.generatePrompt(getFitnessDto);
    const languageModelRequest: CreateCompletionRequest = {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.5,
    };
    return languageModelRequest;
  };

  private getNextMessageOrThrow = (response: CreateCompletionResponse) => {
    const languageModelResponse = response.choices[0].text;
    if (!languageModelResponse)
      throw new Error('Cannot get chat dto from language model response.');
    return languageModelResponse;
  };

  public async getFitnessAdvice(getFitnessDto: GetFitnessRequestDto) {
    try {
      console.log('getFitnessAdvice');
      const languageModelRequest = this.buildRequest(getFitnessDto);
      const languageModelResponse = await this.openApiClient.createCompletion(
        languageModelRequest,
      );
      console.log(`RESULT: ${languageModelResponse.data.choices[0].text}`);
      return { result: languageModelResponse.data.choices[0].text };
    } catch (error) {
      console.error(`ERROR: ${JSON.stringify(error)}`);
      return { result: error };
    }
  }
}
