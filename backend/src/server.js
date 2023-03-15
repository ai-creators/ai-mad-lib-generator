const { PORT = 5000 } = process.env;

const app = require("./app");

app.listen(PORT, linstener);

function linstener() {
  console.log(`🚀Listening on Port ${PORT}🚀`);
}
