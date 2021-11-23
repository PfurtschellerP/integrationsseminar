import { TwitterApi } from 'twitter-api-v2';
import got from 'got';
import { JSDOM } from 'jsdom';

// import data schema
import Datapoint from '../models/datapoint.js';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function retrieveTwitterMentions(accountName) {
  // request tweets about @ account name
  const tweetCount = await client.v2.tweetCountRecent(`@${accountName}`, {
    granularity: 'minute',
  });
  // filter tweets from today
  return tweetCount.data[tweetCount.data.length - 1].tweet_count;
}

async function retrieveStockPrice(stock) {
  // GET stock website
  const response = await got(
    `https://www.finanzen.net/realtimekurs/${stock}@nasdaq`
  );
  // convert string to searchable DOM
  const dom = new JSDOM(response.body);
  // filter DOM
  let stockPrice =
    dom.window.document.querySelector('span.push-data').textContent;
  // remove thousands seperators
  stockPrice = stockPrice.replace('.', '');
  // replace decimal seperators
  stockPrice = stockPrice.replace(',', '.');
  // return dotck price
  return stockPrice;
}

export default async function () {
  // querys to work on
  const queryData = [
    { ceo: 'elonmusk', stock: 'tesla' },
    { ceo: 'tim_cook', stock: 'apple' },
    { ceo: 'satyanadella', stock: 'microsoft' },
    { ceo: 'Dan_Schulman', stock: 'paypal' },
    { ceo: 'finkd', stock: 'meta_platforms' },
    { ceo: 'sundarpichai', stock: 'alphabet' },
    { ceo: 'ajassy', stock: 'amazon' },
  ];

  // Log the current time
  console.log(
    '-------------------------------------------------------------------------'
  );
  const currentTime = new Date();

  console.log(
    `Date and Time: ${currentTime.toLocaleDateString()} ${currentTime.toLocaleTimeString()}`
  );

  // loop through the different querys
  for (let index = 0; index < queryData.length; index++) {
    // retrieve element in queryData array
    const element = queryData[index];
    console.log(element);
    // get data
    let twitterMentions = await retrieveTwitterMentions(element.ceo);
    let stockPrice = await retrieveStockPrice(element.stock);
    // log data
    console.log(
      `Data Download ${index + 1}: ${element.ceo} and ${element.stock}`
    );
    console.log(`-> Twitter: ${twitterMentions}`);
    console.log(`-> Stock: ${stockPrice}`);
    // create datapoint
    const dataPoint = new Datapoint({
      ceo: element.ceo,
      stock: element.stock,
      time: currentTime,
      twitterMentions: twitterMentions,
      stockPrice: stockPrice,
    });
    // save datapoint to the database
    try {
      await dataPoint.save();
    } catch (err) {
      console.log(err);
    }
  }
}
