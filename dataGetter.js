import Datapoint from './models/datapoint.js';
import stats from '@stdlib/stats';

const analysisStartDate = new Date('2021-11-29T10:30:00');

export async function getRecordCount() {
  // count and return documents in database
  // for this, use same aggregate filters as below, but group the results and count them
  const dataCount = await Datapoint.aggregate([
    {
      $project: {
        loc: 1,
        vid: 1,
        time: 1,
        minutes: {
          $add: [{ $multiply: [{ $hour: '$time' }, 60] }, { $minute: '$time' }],
        },
      },
    },
    {
      $match: {
        minutes: { $gte: 14.5 * 60, $lt: 21 * 60 },
        time: { $lt: new Date('2021-12-04'), $gte: new Date('2021-11-28') },
      },
    },
    {
      $group: {
        _id: null,
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  return dataCount[0].count;
}

export async function destructureDocuments(stock) {
  // project to get the minutes of the day
  // then match to get only certain hours of the day (15:00 - 22:00 German time [in UTC time] because of NASDAQ opening time)
  // then only get data with matching stock and before the weekend when I was recording the data
  const queryResults = await Datapoint.aggregate([
    {
      $project: {
        loc: 1,
        vid: 1,
        time: 1,
        stock: 1,
        stockPrice: 1,
        companyNameMentions: 1,
        minutes: {
          $add: [{ $multiply: [{ $hour: '$time' }, 60] }, { $minute: '$time' }],
        },
      },
    },
    {
      $match: {
        minutes: { $gte: 14.5 * 60, $lt: 21 * 60 },
        stock: stock,
        time: { $lt: new Date('2021-12-04'), $gte: new Date('2021-11-28') },
      },
    },
  ]);

  const stockPrice = queryResults.map((q) => q.stockPrice);
  const ceoUserNameMentions = queryResults.map((q) => q.ceoUserNameMentions);
  const ceoFullNameMentions = queryResults.map((q) => q.ceoFullNameMentions);
  const companyNameMentions = queryResults.map((q) => q.companyNameMentions);
  const correlation = stats.pcorrtest(companyNameMentions, stockPrice);

  let result = {
    stock: queryResults.map((q) => q.stock),
    time: queryResults.map((q) => new Date(q.time).toLocaleString()),
    stockPrice: stockPrice,
    ceoUserNameMentions: ceoUserNameMentions,
    ceoFullNameMentions: ceoFullNameMentions,
    companyNameMentions: companyNameMentions,
    correlation: correlation,
  };

  return result;
}
