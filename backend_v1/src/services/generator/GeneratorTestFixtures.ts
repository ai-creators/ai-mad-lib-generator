import { IAdLib } from "../../ts/Interfaces/IAdLibs";

export class GeneratorTestFixtures {
  public static mockService() {
    return jest.mock("./GeneratorService", () => ({
      GeneratorService: {
        saveAdLib: jest.fn().mockImplementation(() => {
          return {
            prompt: "Test Prompt",
            text: "I went to the [adjective_1] store to buy some [noun_1]. I couldn't believe the [adjective_2] prices! I ended up leaving with a [noun_2] and a [noun_3]. It was definitely a [adjective_3] shopping experience.",
            numberOfLikes: 0,
            numberOfDislikes: 0,
            numberOfSaves: 0,
            isHidden: false,
            _id: "64ceafdb42ac5736aeff3c3a",
            createdAt: "2023-08-05T20:23:55.465Z",
            updatedAt: "2023-08-05T20:23:55.465Z",
            __v: 0,
          };
        }),
      },
    }));
  }

  public static mockLibVendor() {
    return jest.mock("../../vendors/libVendor/LibVendor", () => ({
      LibVendor: {
        createFromPrompt: jest.fn().mockImplementation(() => {
          console.log("IN THE MOCK");
          return {
            prompt: "Test Prompt",
            text: "I went to the [adjective_1] store to buy some [noun_1]. I couldn't believe the [adjective_2] prices! I ended up leaving with a [noun_2] and a [noun_3]. It was definitely a [adjective_3] shopping experience.",
          };
        }),
      },
    }));
  }
}
