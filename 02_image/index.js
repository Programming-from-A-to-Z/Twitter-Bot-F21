const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();
const { TwitterApi } = require('twitter-api-v2');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const config = {
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new TwitterApi(config);

tweet();

async function tweet() {
  // const gif = await getGIF();
  // const mediaId = await client.v1.uploadMedia(Buffer.from(gif), { type: 'gif' });
  const mediaId = await client.v1.uploadMedia('rainbow.png', { type: 'png' });
  const metaData = {
    media_id: `${mediaId}`,
    alt_text: {
      text: 'Rainbow!',
    },
  };
  await client.v1.post('media/metadata/create.json', metaData);
  const response = await client.v1.tweet('Rainbow!', { media_ids: [mediaId] });
  const { created_at, id, full_text } = response;
  console.log(`${id} ${created_at}: ${full_text}`);
}

// Getting GIFs from Tenor API!
const Tenor = require('tenorjs').client({
  Key: process.env.TENOR_KEY, // https://tenor.com/developer/keyregistration
  Filter: 'high', // "off", "low", "medium", "high", not case sensitive
  Locale: 'en_US', // Your locale here, case-sensitivity depends on input
  MediaFilter: 'minimal', // either minimal or basic, not case sensitive
  DateFormat: 'D/MM/YYYY - H:mm:ss A', // Change this accordingly
});

function random(arr) {
  let i = Math.floor(Math.random() * arr.length);
  return arr[i];
}

async function getGIF() {
  const gifs = await Tenor.Search.Query('rainbow', '11');
  let gif = random(gifs);
  let url = gif.media[0].tinygif.url;
  let response = await fetch(url);
  let blob = await response.blob();
  let buffer = await blob.arrayBuffer();
  // let base64String = Buffer.from(buffer).toString('base64');
  return buffer;
}
