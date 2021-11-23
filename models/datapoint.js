import mongoose from 'mongoose';

const dataPoint = new mongoose.Schema({
  ceo: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  twitterMentions: {
    type: Number,
    required: true,
  },
  stockPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Datapoint', dataPoint);
