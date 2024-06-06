import express from 'express';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import router from './routes/routes.js';
import mongoose from 'mongoose';

const app = express();

app.use(express.urlencoded({ extended: true })); // use to collect form data from the client
app.use(bodyParser.json()); // use to parse JSON bodies

configDotenv();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database Connected Successfully!!');
  })
  .catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
  });

app.listen(7000, () => {
  console.log('Server is listening on port 7000');
});

app.use('/', router);
