import { TwitterApi } from 'twitter-api-v2';
import got from 'got';
import { JSDOM } from 'jsdom';

// import data schema
import Datapoint from '../models/datapoint.js';

const client = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);

async function retrieveTweets(searchQuery) {
  // request tweets matching the query
  const tweetCount = await client.v2.tweetCountRecent(searchQuery, {
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
    {
      ceoUserName: '@elonmusk',
      ceoFullName: 'Elon Musk',
      stock: 'tesla',
      company: 'Tesla',
    },
    {
      ceoUserName: '@tim_cook',
      ceoFullName: 'Tim Cook',
      stock: 'apple',
      company: 'Apple',
    },
    {
      ceoUserName: '@satyanadella',
      ceoFullName: 'Satya Nadella',
      stock: 'microsoft',
      company: 'Microsoft',
    },
    {
      ceoUserName: '@finkd',
      ceoFullName: 'Mark Zuckerberg',
      stock: 'meta_platforms',
      company: 'Meta',
    },
    {
      ceoUserName: '@sundarpichai',
      ceoFullName: 'Sundar Pichai',
      stock: 'alphabet',
      company: 'Alphabet',
    },
    {
      ceoUserName: '@ajassy',
      ceoFullName: 'Andy Jassy',
      stock: 'amazon',
      company: 'Amazon',
    },
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
    let ceoUserNameMentions = await retrieveTweets(element.ceoUserName);
    let ceoFullNameMentions = await retrieveTweets(element.ceoFullName);
    let companyNameMentions = await retrieveTweets(element.company);
    let stockPrice = await retrieveStockPrice(element.stock);
    // log data
    console.log(
      `Data Download ${index + 1}: ${element.ceoFullName} and ${
        element.company
      }`
    );
    console.log(`-> CEO Username Mentions: ${ceoUserNameMentions}`);
    console.log(`-> CEO Full Name Mentions: ${ceoFullNameMentions}`);
    console.log(`-> Company Name Mentions: ${companyNameMentions}`);
    console.log(`-> Stock: ${stockPrice}`);
    // create datapoint
    const dataPoint = new Datapoint({
      ceoName: element.ceoFullName,
      company: element.company,
      stock: element.stock,
      time: currentTime,
      ceoUserNameMentions: ceoUserNameMentions,
      ceoFullNameMentions: ceoFullNameMentions,
      companyNameMentions: companyNameMentions,
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
