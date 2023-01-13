require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const httpStatus = require('http-status');
const dbConfig = require('./configs/db');
const logger = require('./configs/logger');
const { errorConverter, errorHandler } = require('./middlewares/errorHandler');
const routeV1 = require('./routes/index');
const ApiError = require('./helpers/ApiError');

const app = express();

const { NODE_PORT } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());
app.use(morgan('dev'));

app.use('/v1', routeV1);

app.response.sendWrapped = function (message, data, statusCode = httpStatus.OK) {
  return this.status(statusCode).send({
    status: statusCode,
    message,
    data,
  });
};

dbConfig.getConnection((error) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info('MySQL Database in Connected!');
  }
});

app.use((req, res, next) => {
  next(new ApiError('Not found', httpStatus.NOT_FOUND));
});

app.use(errorConverter);
app.use(errorHandler);

app.listen(NODE_PORT, () => {
  logger.info(`App listen on port ${NODE_PORT}`);
});
