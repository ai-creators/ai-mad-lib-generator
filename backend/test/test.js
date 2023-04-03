const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../src/app");
const { expect } = chai;
chai.use(chaiHttp);

describe("POST /generate", () => {
  it("Should return a mad lib with the correct number of tokens and replaced placeholders", async () => {
    const template = "The [ADJ_1] [NOUN_1] [VERB_1] over the [ADJ_2] [NOUN_2].";
    const words = {
      ADJ: ["quick", "brown"],
      NOUN: ["fox", "dog"],
      VERB: ["jumped", "ran"],
    };
    const res = await chai
      .request(server)
      .post("/generate")
      .send({ template, words });
    expect(res.status).to.equal(200);
    expect(res.body.madlib).to.match(/The quick fox jumped over the brown dog\./);
    expect(res.body.madlib.split(" ")).to.have.lengthOf.at.least(50);
    expect(res.body.madlib.split(" ")).to.have.lengthOf.at.most(100);
  });
});
