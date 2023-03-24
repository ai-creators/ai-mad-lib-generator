const chai = require('chai');
const chaiHttp = require('chai-http');
const dotenv = require('dotenv');
const app = require('../server');

dotenv.config();
chai.use(chaiHttp);
chai.should();

describe('GPT API', () => {
  it('should return response from OpenAI API', (done) => {
    const prompt = 'Hello, OpenAI';
    chai.request(app)
      .get(`/gpt?prompt=${prompt}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.be.a('string');
        done();
      });
  });
});
