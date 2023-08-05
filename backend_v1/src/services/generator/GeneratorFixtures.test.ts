import { mocked, Mocked } from "jest-mock";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";
import { GeneratorService } from "./GeneratorService";

export class GeneratorFixtures {
  // public static mockService(): Mocked<GeneratorService> {
  //   jest.mock("./GeneratorService", () => {
  //     return jest.fn().mockImplementation(() => {
  //       return {
  //         saveAdLib: (lib: IAdLib) => {
  //           return GeneratorFixtures.mockAdLib;
  //         },
  //       };
  //     });
  //   });
  //   const mockGeneratorService = mocked(GeneratorService);
  //   return mockGeneratorService;
  // }

  private static readonly mockAdLib = {
    prompt: "Test Prompt",
    text: "I went to the [adjective_1] store to buy a [noun_1]. While I was there, I saw a [adjective_2] [noun_2] and decided to [verb_1] it. It was the [adjective_3] [noun_3] I had ever seen! I also picked up some [plural_noun_1] and a [noun_4] for my [noun_5]. Overall, it was a [adjective_4] shopping trip.",
    numberOfLikes: 0,
    numberOfDislikes: 0,
    numberOfSaves: 0,
    isHidden: false,
    _id: "64c6b10c24229d23ff572671",
    createdAt: "2023-07-30T18:50:52.489Z",
    updatedAt: "2023-07-30T18:50:52.489Z",
    __v: 0,
  };
}
