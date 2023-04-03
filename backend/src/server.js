const { PORT = 5000 } = process.env;
const mongoose = require("mongoose");
const app = require("./app");
const { getDatabaseUri } = require("./db/config");

// Middleware to check the API key
function checkApiKey(req, res, next) {
  const apiKey = req.headers.authorization;
  const validApiKey = 'Bearer your_correct_api_key_here'; // Replace with your actual API key

  if (apiKey !== validApiKey) {
    return res.status(400).json({ error: 'Invalid API key' });
  }

  next();
}

// Apply the API key check middleware to your app
app.use(checkApiKey);

mongoose
  .connect(getDatabaseUri())
  .then(() => {
    console.log("DB connection is successful🚀");
  })
  .catch((error) => {
    console.log("💣😑 What Happened");
    console.error(error);
  });

app.listen(PORT, linstener);
function linstener() {
  console.log(`🚀Listening on Port ${PORT}🚀`);
}
