import { GeneratorValidator } from "../../src/services/generator/GeneratorValidator";

describe("Generator Validator", () => {
  describe("validate", () => {
    it("Should return the correct label", () => {
      const validator = new GeneratorValidator();

      const data = {
        prompt: "",
      };

      validator.validate(data);
      expect(validator.getInvalidProperties()[0].label).toBe("prompt");
    });

    it("Should return the correct message when no prompt has been provided", () => {
      const validator = new GeneratorValidator();

      const data: any = {};

      validator.validate(data);
      expect(validator.getInvalidProperties()[0].label).toBe("prompt");
      expect(validator.getInvalidProperties()[0].message).toBe(
        "Prompt is required"
      );
    });

    it("Should return the correct message when the prompt is an empty string", () => {
      const validator = new GeneratorValidator();

      const data = {
        prompt: "",
      };

      validator.validate(data);
      expect(validator.getInvalidProperties()[0].label).toBe("prompt");
      expect(validator.getInvalidProperties()[0].message).toBe(
        "Prompt is required"
      );
    });

    it("Should return the correct message when the prompt is not of type string", () => {
      const validator = new GeneratorValidator();

      const data: any = {
        prompt: [],
      };

      validator.validate(data);
      expect(validator.getInvalidProperties()[0].label).toBe("prompt");
      expect(validator.getInvalidProperties()[0].message).toBe(
        "Prompt needs to be of type string"
      );
    });

    it("Should return the correct message when the prompt is longer than the allowed amount", () => {
      const validator = new GeneratorValidator();

      const data = {
        prompt:
          "012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789",
      };

      validator.validate(data);
      expect(validator.getInvalidProperties()[0].label).toBe("prompt");
      expect(validator.getInvalidProperties()[0].message).toBe(
        `Prompt has ${data.prompt.length} characters and cannot exceed 255 characters`
      );
    });
  });

  describe("getInvalidPropertiesAsString", () => {
    it("Should get the invalidProperties as a string", () => {
      const validator = new GeneratorValidator();

      const data = {
        prompt: "",
      };

      validator.validate(data);
      expect(validator.getInvalidPropertiesAsString()).toBe("prompt");
    });
  });

  describe("getFormattedInvalidProperties", () => {
    it("Should get the invalid properties formatted", () => {
      const validator = new GeneratorValidator();

      const data = {
        prompt: "",
      };

      validator.validate(data);
      expect(validator.getFormattedInvalidProperties()).toBe(
        "prompt: Prompt is required"
      );
    });
  });

  describe("getInvalidProperties", () => {
    it("Should get the invalid properties", () => {
      const validator = new GeneratorValidator();

      const data = {
        prompt: "",
      };

      validator.validate(data);
      const invalidProperties = validator.getInvalidProperties();
      expect(invalidProperties.length).toBe(1);
      expect(invalidProperties[0].label).toBe("prompt");
      expect(invalidProperties[0].message).toBe("Prompt is required");
    });
  });

  describe("resetInvalidProperties", () => {
    it("Should reset the invalid properties", () => {
      const validator = new GeneratorValidator();

      const data = {
        prompt: "",
      };

      validator.validate(data);
      expect(validator.getInvalidProperties().length).toBe(1);
      validator.resetInvalidProperties();
      expect(validator.getInvalidProperties().length).toBe(0);
    });
  });

  describe("Prompt sentence and word count validation", () => {
    const validator = new GeneratorValidator();

    it("Should return the correct message when the prompt exceeds 3 sentences", () => {
      const data = {
        prompt: "This is the first sentence. This is the second sentence. This is the third sentence. This is the fourth sentence.",
      };

      validator.validate(data);
      expect(validator.getInvalidProperties()[0].label).toBe("prompt");
      expect(validator.getInvalidProperties()[0].message).toBe("Prompt cannot exceed 3 sentences");
    });

    it("Should return the correct message when the prompt exceeds 50 words", () => {
      const data = {
        prompt: "This ".repeat(51).trim(),  // Creates a prompt with 51 words
      };

      validator.validate(data);
      expect(validator.getInvalidProperties()[0].label).toBe("prompt");
      expect(validator.getInvalidProperties()[0].message).toBe("Prompt cannot exceed 50 words");
    });
  });

});
