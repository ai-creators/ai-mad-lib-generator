import path from "path";
import { Mocker } from "../test/Mocker";
import { Controller } from "./Controller";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

describe("Controller", () => {
  it("Should return the proper response", () => {
    const expectedData = {
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
    const res = Mocker.mockResponse();
    const expectedStatus = 200;
    Controller.sendResponse(res, expectedData, expectedStatus);
    const data = res._getJSONData();
    expect(res._getStatusCode()).toBe(expectedStatus);
    expect(data.prompt).toBe(expectedData.prompt);
    expect(data.text).toBe(expectedData.text);
    expect(data.numberOfLikes).toBe(expectedData.numberOfLikes);
    expect(data.numberOfDislikes).toBe(expectedData.numberOfDislikes);
    expect(data.numberOfSaves).toBe(expectedData.numberOfSaves);
    expect(data.isHidden).toBe(expectedData.isHidden);
    expect(data._id).toBe(expectedData._id);
    expect(data.createdAt).toBe(expectedData.createdAt);
    expect(data.updatedAt).toBe(expectedData.updatedAt);
  });
});
