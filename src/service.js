require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConfig = require('./configs/db');
const { errorConverter, errorHandler } = require('./middlewares/errorHandler');
const routeV1 = require('./routes/index');

const app = express();

const { NODE_PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.use('/v1', routeV1);

dbConfig.getConnection((error) => {
  if (error) {
    console.error(error);
  } else {
    console.log('MySQL Database in Connected!');
  }
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(NODE_PORT, () => {
  console.log(`App listen on port ${NODE_PORT}`);
});
