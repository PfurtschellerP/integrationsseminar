import Datapoint from './models/datapoint.js';

export async function getRecordCount() {
  // count and return documents in database
  return await Datapoint.countDocuments({});
}

export async function destructureDocuments(stock) {
  // retrieve all Datapoints for that stock
  const queryResults = await Datapoint.find({ stock: stock });

  let result = {
    stock: queryResults.map((q) => q.stock),
    time: queryResults.map((q) => new Date(q.time).toLocaleString()),
    stockPrice: queryResults.map((q) => q.stockPrice),
    ceoUserNameMentions: queryResults.map((q) => q.ceoUserNameMentions),
    ceoFullNameMentions: queryResults.map((q) => q.ceoFullNameMentions),
    companyNameMentions: queryResults.map((q) => q.companyNameMentions),
  };

  return result;
}
