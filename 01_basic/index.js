const dotenv = require('dotenv');
dotenv.config();

const { TwitterApi } = require('twitter-api-v2');

const config = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new TwitterApi(config);

tweet();

async function tweet() {
  const r = Math.floor(Math.random() * 100000);
  const response = await client.v1.tweet(`Today's tweet is brought to you by the number ${r}!`);
  const { created_at, id, full_text } = response;
  console.log(`${id} ${created_at}: ${full_text}`);
}
