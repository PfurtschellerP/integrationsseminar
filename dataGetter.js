import Datapoint from './models/datapoint.js';
import stats from '@stdlib/stats';

const analysisStartDate = new Date('2021-11-29T10:30:00');

export async function getRecordCount() {
  // count and return documents in database
  return await Datapoint.countDocuments({
    time: { $gt: analysisStartDate },
  });
}

export async function destructureDocuments(stock) {
  // retrieve all Datapoints for that stock
  const queryResults = await Datapoint.find({
    stock: stock,
    time: { $gt: analysisStartDate },
  });

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
