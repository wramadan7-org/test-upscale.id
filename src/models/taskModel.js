const httpStatus = require('http-status');
const db = require('../configs/db');
const ApiError = require('../helpers/ApiError');

const taskGetAllModel = async () => {
  try {
    const response = await db.promise().query('SELECT * FROM s');
    const [rows] = response;
    return rows;
  } catch (error) {
    throw new ApiError(error.sqlMessage, httpStatus.CONFLICT);
  }
};

module.exports = {
  taskGetAllModel,
};
