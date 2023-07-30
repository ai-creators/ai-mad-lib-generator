import { Mocker } from "../../test/Mocker";
import { GeneratorController } from "./GeneratorController";

describe("Generator Controller", () => {
  const controller = new GeneratorController();

  describe("generateLib", () => {
    it("Should return the proper error if no prompt is provided", async () => {
      const { req, res, next } = Mocker.mockParams();
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
      const { req, res, next } = Mocker.mockParams();
      req.body.data.prompt = 100;
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
      const { req, res, next } = Mocker.mockParams();
      const prompt =
        "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789";
      req.body.data.prompt = prompt;
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
  });
});
