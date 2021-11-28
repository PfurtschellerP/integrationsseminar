// import dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { engine } from 'express-handlebars';
import * as dataGetter from './dataGetter.js';

// define ports
const port = 80;

// initialize environment variables
dotenv.config();

// create app
const app = express();

// activate handlebars page renderer
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

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

// Views
app.get('/', async (req, res) => {
  res.render('home', {
    records: await dataGetter.getRecordCount(),
    approxDataPoints: (await dataGetter.getRecordCount()) * 2,
    pageTitle: 'Home',
  });
});

app.get('/apple', async (req, res) => {
  res.render('apple', {
    pageTitle: 'Apple',
    data: JSON.stringify(await dataGetter.destructureDocuments('apple')),
  });
});
app.get('/meta', async (req, res) => {
  res.render('meta', {
    pageTitle: 'Meta',
    data: JSON.stringify(
      await dataGetter.destructureDocuments('meta_platforms')
    ),
  });
});
app.get('/microsoft', async (req, res) => {
  res.render('microsoft', {
    pageTitle: 'Microsoft',
    data: JSON.stringify(await dataGetter.destructureDocuments('microsoft')),
  });
});
app.get('/alphabet', async (req, res) => {
  res.render('alphabet', {
    pageTitle: 'Alphabet',
    data: JSON.stringify(await dataGetter.destructureDocuments('alphabet')),
  });
});
app.get('/amazon', async (req, res) => {
  res.render('amazon', {
    pageTitle: 'Amazon',
    data: JSON.stringify(await dataGetter.destructureDocuments('amazon')),
  });
});
app.get('/tesla', async (req, res) => {
  res.render('tesla', {
    pageTitle: 'Tesla',
    data: JSON.stringify(await dataGetter.destructureDocuments('tesla')),
  });
});

// serve static ressources
app.use(express.static('public'));

// Listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
