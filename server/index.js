import express from 'express';
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
import router from './routes/routes';

const app = express();

app.use(express.urlencoded({ extended: true })); // use to collect form data from the client
app.use(bodyParser.json()); // use to parse JSON bodies

configDotenv();

app.listen(7000, () => {
  console.log('Server is listening on port 7000');
});

app.use('/', router);
