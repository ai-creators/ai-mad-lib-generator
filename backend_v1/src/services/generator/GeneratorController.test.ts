import path from "path";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { NODE_ENV } = process.env;

import { Mocker } from "../../test/Mocker";
import { GeneratorController } from "./GeneratorController";
import { DatabaseManager } from "../../db/DatabaseManager";
import { DatabaseConfig } from "../../db/DatabaseConfig";
import AdLib from "../../db/models/AdLibModel";
import { IAdLib } from "../../ts/Interfaces/IAdLibs";

describe("Generator Controller", () => {
  const controller = new GeneratorController();

  beforeAll(() => {
    if (!NODE_ENV) {
      throw new Error("NODE_ENV required.");
    }
    try {
      // console.log("Connecting to db for testing 🔌");
      DatabaseManager.connect(DatabaseConfig.getDatabaseUri(NODE_ENV));
      DatabaseManager.rollback<any>(AdLib, []);
    } catch (error) {
      console.log("💣😑 What Happened");
      console.error(error);
    }
  });

  afterAll(() => {
    DatabaseManager.disconnect();
  });

  describe("generateLib", () => {
    it("Should return the proper error if no prompt is provided", async () => {
      const req = Mocker.mockRequest({
        body: {
          data: {},
        },
      });
      const res = Mocker.mockResponse();
      const next = Mocker.mockNextFunction();
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
      const req = Mocker.mockRequest({
        body: {
          data: {
            prompt: 100,
          },
        },
      });
      const res = Mocker.mockResponse();
      const next = Mocker.mockNextFunction();
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
      const req = Mocker.mockRequest({
        body: {
          data: {
            prompt,
          },
        },
      });
      const res = Mocker.mockResponse();
      const next = Mocker.mockNextFunction();
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
      const req = Mocker.mockRequest({
        body: {
          data: {
            prompt: "A dog walking a human",
          },
        },
      });
      const res = Mocker.mockResponse();
      const next = Mocker.mockNextFunction();
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
