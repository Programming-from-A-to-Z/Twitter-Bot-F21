const dotenv = require('dotenv');
dotenv.config();

const { TwitterApi, ETwitterStreamEvent } = require('twitter-api-v2');

const config = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new TwitterApi(config);

stream();

function newTweet(tweet) {
  console.log(tweet.id);
}

async function stream() {
  const params = {
    track: 'random',
  };
  const stream = await client.v1.filterStream(params);

  // Enable reconnect feature
  stream.autoReconnect = true;

  // Emitted when a Twitter payload (a tweet or not, given the endpoint).
  stream.on(ETwitterStreamEvent.Data, newTweet);
}
