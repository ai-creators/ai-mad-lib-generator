import { GeneratorController } from "../../src/services/generator/GeneratorController";
import { HttpMocker } from "../HttpMocker";

describe("Generator Controller", () => {
  describe("generateRandomLib", () => {
    let controller = new GeneratorController();
    let serviceSpy: jest.SpyInstance;
    let vendorSpy: jest.SpyInstance;
    let vendorSpy2: jest.SpyInstance;
    beforeEach(() => {
      serviceSpy = jest
        .spyOn(controller.getService(), "saveAdLib")
        .mockReturnValue(
          Promise.resolve({
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
          })
        );
      vendorSpy = jest
        .spyOn(controller.getLibVendor(), "createRandomPrompt")
        .mockReturnValue(Promise.resolve("Test prompt"));

      vendorSpy2 = jest
        .spyOn(controller.getLibVendor(), "createFromPrompt")
        .mockReturnValue(
          Promise.resolve({
            prompt: "Test Prompt",
            text: "I went to the [adjective_1] store to buy some [noun_1]. I couldn't believe the [adjective_2] prices! I ended up leaving with a [noun_2] and a [noun_3]. It was definitely a [adjective_3] shopping experience.",
          })
        );
    });

    it("Should generate random ad-lib", async () => {
      const req = HttpMocker.mockRequest({
        body: {
          data: {},
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      await controller.generateRandomLib(req, res, next);
      const data = res._getJSONData();
      expect(data.text).toBeDefined();
      expect(data.prompt).toBeDefined();
      expect(data.numberOfLikes).toBeDefined();
      expect(data.numberOfDislikes).toBeDefined();
      expect(data.numberOfSaves).toBeDefined();
      expect(data.isHidden).toBeDefined();
    });
  });

  describe("generateLib", () => {
    let controller = new GeneratorController();
    let serviceSpy: jest.SpyInstance;
    let vendorSpy: jest.SpyInstance;

    beforeEach(() => {
      serviceSpy = jest
        .spyOn(controller.getService(), "saveAdLib")
        .mockReturnValue(
          Promise.resolve({
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
          })
        );
      vendorSpy = jest
        .spyOn(controller.getLibVendor(), "createFromPrompt")
        .mockReturnValue(
          Promise.resolve({
            prompt: "Test Prompt",
            text: "I went to the [adjective_1] store to buy some [noun_1]. I couldn't believe the [adjective_2] prices! I ended up leaving with a [noun_2] and a [noun_3]. It was definitely a [adjective_3] shopping experience.",
          })
        );
    });

    it("Should return the proper error if no prompt is provided", async () => {
      const req = HttpMocker.mockRequest({
        body: {
          data: {},
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: prompt: Prompt is required";
      const expectedStatus = 400;
      try {
        await controller.generateLib(req, res, next);
      } catch (e: any) {
        expect(expectedMessage).toBe(e.message);
        expect(expectedStatus).toBe(e.status);
      }
    });

    it("Should return the propper error if the prompt is not a string", async () => {
      const req = HttpMocker.mockRequest({
        body: {
          data: {
            prompt: 100,
          },
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedMessage =
        "These properties are not valid: prompt: Prompt needs to be of type string";
      const expectedStatus = 400;
      try {
        await controller.generateLib(req, res, next);
      } catch (e: any) {
        expect(expectedMessage).toBe(e.message);
        expect(expectedStatus).toBe(e.status);
      }
    });

    it("Should return the propper error if the prompt is over 255 characters", async () => {
      const prompt =
        "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789";
      const req = HttpMocker.mockRequest({
        body: {
          data: {
            prompt,
          },
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      const expectedPromptLength = prompt.length;
      const expectedMessage = `These properties are not valid: prompt: Prompt has ${expectedPromptLength} characters and cannot exceed 255 characters`;
      const expectedStatus = 400;
      try {
        await controller.generateLib(req, res, next);
      } catch (e: any) {
        expect(expectedMessage).toBe(e.message);
        expect(expectedStatus).toBe(e.status);
      }
    });

    it("Should generate a ad-lib based on a prompt", async () => {
      const req = HttpMocker.mockRequest({
        body: {
          data: {
            prompt: "A dog walking a human",
          },
        },
      });
      const res = HttpMocker.mockResponse();
      const next = HttpMocker.mockNextFunction();
      await controller.generateLib(req, res, next);
      const data = res._getJSONData();
      expect(data.text).toBeDefined();
      expect(data.prompt).toBeDefined();
      expect(data.numberOfLikes).toBeDefined();
      expect(data.numberOfDislikes).toBeDefined();
      expect(data.numberOfSaves).toBeDefined();
      expect(data.isHidden).toBeDefined();
    });
  });
});
