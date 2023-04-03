const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const expect = chai.expect;
const app = require("../src/app");

chai.use(chaiHttp);

describe('Additional MadLib Generator API Tests', () => {
  describe('POST /generate/madlib', () => {
    
    it("should return 400 when an invalid API key is provided", function (done) {
      const originalApiKey = process.env.OPENAI_API_KEY;
      process.env.OPENAI_API_KEY = 'invalid_key';
    
      const data = {
        data: {
          prompt: "My favorite color is [color].",
        },
      };
    
      request(app)
        .post("/generate/madlib")
        .send(data)
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err);
    
          assert.ok(res.body.error);
          assert.strictEqual(res.body.error, "No open ai key has been provided");
          process.env.OPENAI_API_KEY = originalApiKey;
          done();
        });
    });
    
  });
});
