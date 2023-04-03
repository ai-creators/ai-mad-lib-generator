const assert = require("assert");
const nock = require("nock");
const { OpenAIApi } = require("openai");

const openai = new OpenAIApi(process.env.OPENAI_API_KEY);

    describe("OpenAI API Mock Tests", function () {
    afterEach(() => {
        nock.cleanAll();
    });

    it("should successfully mock the OpenAI API response", async function () {
        const prompt = "Write a paragraph about the benefits of exercise.";
        const mockResponse = {
        choices: [
            {
            text: " Exercise has numerous benefits, both physical and mental...",
            },
        ],
        };

        nock("https://api.openai.com")
        .post("/v1/completions")
        .reply(200, (uri, requestBody) => {
            const body = requestBody;
            if (
            body.model === "text-davinci-003" &&
            body.prompt === prompt &&
            body.max_tokens === 50 &&
            body.temperature === 0.5 &&
            body.n === 1
            ) {
            return mockResponse;
            } else {
            return { error: "Request body does not match expected values" };
            }
        });

        const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 50,
        temperature: 0.5,
        n: 1,
        });

        assert.strictEqual(response.data.choices[0].text, mockResponse.choices[0].text, "Mocked response does not match expected response");
    });

    // Test 2: Verify the OpenAI API handles error response correctly
    it("should handle error response from the OpenAI API", async function () {
        const prompt = "Write a paragraph about the drawbacks of junk food.";
    
        nock("https://api.openai.com")
        .post("/v1/completions")
        .reply(400, { error: "An error occurred" });
    
        try {
        await openai.createCompletion({
            model: "text-davinci-003",
            prompt,
            max_tokens: 50,
            temperature: 0.5,
            n: 1,
        });
        } catch (error) {
        assert.strictEqual(error.response.status, 400, "Error status does not match expected value");
        assert.strictEqual(error.response.data.error, "An error occurred", "Error message does not match expected value");
        }
    });
    
    // Test 3: Verify the OpenAI API response when using a different model
    it("should successfully mock the OpenAI API response for a different model", async function () {
        const prompt = "Write a paragraph about the importance of a balanced diet.";
        const mockResponse = {
        choices: [
            {
            text: "A balanced diet is essential for maintaining good health...",
            },
        ],
        };
    
        nock("https://api.openai.com")
        .post("/v1/completions")
        .reply(200, (uri, requestBody) => {
            const body = requestBody;
            if (
            body.model === "text-curie-002" &&
            body.prompt === prompt &&
            body.max_tokens === 60 &&
            body.temperature === 0.6 &&
            body.n === 1
            ) {
            return mockResponse;
            } else {
            return { error: "Request body does not match expected values" };
            }
        });
    
        const response = await openai.createCompletion({
        model: "text-curie-002",
        prompt,
        max_tokens: 60,
        temperature: 0.6,
        n: 1,
        });
    
        assert.strictEqual(response.data.choices[0].text, mockResponse.choices[0].text, "Mocked response does not match expected response");
    });
});
