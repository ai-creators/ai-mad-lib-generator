const Food = require("../models/foodModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const Seeder = require("./Seeder");

async function seed(type = "") {
  if (type === "--libs" || !type) {
    await Seeder.inject(`${__dirname}/libs.json`, User);
  }
}

async function destroy(type = "") {
  if (type === "--libs" || !type) {
    await Seeder.delete(User);
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
