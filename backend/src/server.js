const { PORT = 5000 } = process.env;

const app = require("./app");

app.listen(PORT, linstener);

function linstener() {
  console.log(`🚀Listening on Port ${PORT}🚀`);
}


// const express = require('express');
// const openai = require('openai');

// const app = express();
// const port = 3000;

// app.get('/gpt', (req, res) => {
//   const prompt = req.query.prompt;

//   openai.completions.create({
//     engine: 'davinci',
//     prompt: prompt,
//     max_tokens: 10,
//     n: 1,
//     stop: ['\n']
//   })
//   .then(response => {
//     res.send(response.choices[0].text);
//   })
//   .catch(error => {
//     console.log(error);
//     res.status(500).send('Error getting response from OpenAI API');
//   });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });
