const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const expect = chai.expect;
const app = require("../src/app");
const request = require('supertest');
const assert = require('assert');

chai.use(chaiHttp);

describe('Third MadLib Generator API Test Set', () => {
  describe('POST /generate/madlib', () => {

        // Test 1: Verify the OpenAI API response when using the default model
        it("should return 200 and a generated madlib when valid input is provided", function (done) {
        const data = {
            data: {
            prompt: "I love [animal] because they are [adjective].",
            },
        };

        request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(200)
            .end(function (err, res) {
            if (err) return done(err);

            assert.ok(res.body);
            assert.ok(res.body.choices);
            assert.ok(res.body.choices[0].text);
            done();
            });
        });

        // Test 2: Verify the OpenAI API handles error response correctly
        it("should return 400 when the data object is missing in the request body", function (done) {
        const data = {};

        request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400)
            .end(function (err, res) {
            if (err) return done(err);

            assert.ok(res.body.error);
            assert.strictEqual(res.body.error, "Missing data object in request body");
            done();
            });
        });

        // Test 3: Verify the OpenAI API handles error response correctly
        it("should return 400 when the prompt is missing in the data object", function (done) {
            const data = {
            data: {}
            };
        
            request(app)
            .post("/generate/madlib")
            .send(data)
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
        
                assert.ok(res.body.error);
                assert.strictEqual(res.body.error, "Prompt is required.");
                done();
            });
        });
        
        // Test 4: Verify the OpenAI API handles error response correctly
        it("should return 400 when the prompt format is incorrect (no brackets)", (done) => {
            request(app)
            .post("/generate/madlib")
            .send({ data: { prompt: "This is a test without brackets" } })
            .expect(400)
            .expect((res) => {
                assert.strictEqual(
                res.body.error,
                "Invalid prompt format. Use brackets around placeholders and avoid spaces inside the brackets"
                );
            })
            .end(done);
        });
        
        // Test 5: Verify the OpenAI API handles error response correctly
        it("should return 400 when the prompt contains spaces inside brackets", (done) => {
            request(app)
            .post("/generate/madlib")
            .send({ data: { prompt: "This is a [test with spaces] inside brackets" } })
            .expect(400)
            .expect((res) => {
                assert.strictEqual(
                res.body.error,
                "Invalid prompt format. Use brackets around placeholders and avoid spaces inside the brackets"
                );
            })
            .end(done);
        });

  });
});
