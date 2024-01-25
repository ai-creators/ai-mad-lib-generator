# ai-ad-libs

- An application that allows users to generate ad-libs using ai based on user prompt.

- This application was built with React, Vite, Express, Node.js, JavaScript, Tailwindcss, Mongodb, Mongoose, and openai's api.

- This application allows users to save ad-libs created for later use. This application also allows users to browse featured, most recent, and interesting ad-libs created by users.
 - Generate Mad Libs based on user-defined prompts
 - Generate random prompts for Mad Libs
 - Save generated Mad Libs for later use
 - Utilizes OpenAI's GPT-3 for AI-powered Mad Lib generation

- Part of Ai-wranglers Hackathon.


## Deployed version

- [aiadlibs](https://aiadlibs.com/)

## Authors

- Anthony Mclamb

- Zhi Zheng

## Version History

-1.0 Initial Release

## Getting Started
 Prerequisites
 -Node.js
 -npm
 
## Installation
 Clone the repository:
 - git clone https://github.com/your_username/ai-mad-lib-generator.git

## Install the dependencies for both the server and client:
 cd ai-mad-lib-generator
 -npm install
 -cd client
 -npm install
 
## Create a .env file in the root of the ai-mad-lib-generator folder with the following contents:
  OPENAI_API_KEY=your_openai_api_key
  -Replace your_openai_api_key with your actual OpenAI API key.

## Run the server and client concurrently:
  -cd ai-mad-lib-generator
  -npm run dev

## Open your browser and navigate to http://localhost:PORTNUMBER. The application should now be running.

## Usage
  From the landing page, click "Create a Mad Lib" to start generating a Mad Lib.
  Choose between providing your own prompt or using a randomly generated prompt.
  Click "Generate Mad Lib" to create your Mad Lib.
  Fill in the blanks in the generated Mad Lib to complete the story.

## Acknowledgments

- Credit to openai's open source software.
- OpenAI GPT-3 for providing the AI-powered Mad Lib generation.
- Acknowledgment to Don the Developer for hosting the hackathon.
