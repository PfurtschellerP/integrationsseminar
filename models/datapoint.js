import mongoose from 'mongoose';

const dataPoint = new mongoose.Schema({
  ceoName: {
    type: String,
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  ceoUserNameMentions: {
    type: Number,
    required: true,
  },
  ceoFullNameMentions: {
    type: Number,
    required: true,
  },
  companyNameMentions: {
    type: Number,
    required: true,
  },
  stockPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Datapoint', dataPoint);
