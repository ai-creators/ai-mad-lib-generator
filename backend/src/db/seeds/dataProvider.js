const Lib = require("../models/LibModel");
const Seeder = require("./Seeder");

async function seed(type = "") {
  if (type === "--libs" || !type) {
    await Seeder.inject(`${__dirname}/libs.json`, Lib);
  }
}

async function destroy(type = "") {
  if (type === "--libs" || !type) {
    await Seeder.delete(Lib);
  }
}

if (process.argv[2] === "--import" && process.argv[3] === "--all") {
  seed();
} else if (process.argv[2] === "--import" && process.argv[3] !== undefined) {
  seed(process.argv[3]);
} else if (process.argv[2] === "--delete" && process.argv[3] === "--all") {
  destroy();
} else if (process.argv[2] === "--delete" && process.argv[3] !== undefined) {
  destroy(process.argv[3]);
}
