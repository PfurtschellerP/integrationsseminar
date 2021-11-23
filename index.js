// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// initialize environment variables
dotenv.config();

// create app
const app = express();

// import scheduled jobs
import scheduler from './scheduler.js';
import scheduledJobs from './handlers/jobs.js';
scheduler.initCrons(scheduledJobs);

// connect to db
mongoose.connect(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
});
// mongoose.set('debug', true)
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Connected to Database'));

// app uses
app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
app.use(cors());

// root get
app.get('/', (req, res) => {
  res.send('Datensammler');
});
