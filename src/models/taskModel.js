const httpStatus = require('http-status');
const db = require('../configs/db');
const ApiError = require('../helpers/ApiError');

const taskCreateModel = async (data) => {
  try {
    const response = await db.promise().query('INSERT INTO tasks (??) VALUES (?)', [['title', 'description', 'is_completed'], data]);
    const [rows] = response;

    return rows;
  } catch (error) {
    throw new ApiError(error.sqlMessage || error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const taskGetAllModel = async () => {
  try {
    const response = await db.promise().query('SELECT * FROM tasks');
    const [rows] = response;

    return rows;
  } catch (error) {
    throw new ApiError(error.sqlMessage || error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const taskGetByIdModel = async (id) => {
  try {
    const response = await db.promise().query('SELECT * FROM tasks WHERE id = ?', id);
    const [[rows]] = response;

    return rows;
  } catch (error) {
    throw new ApiError(error.sqlMessage || error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const taskUpdateByIdModel = async (data, id) => {
  try {
    const response = await db.promise().query('UPDATE tasks SET ? WHERE id = ?', [data, id]);
    const [rows] = response;

    return rows;
  } catch (error) {
    throw new ApiError(error.sqlMessage || error.message, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

const taskDeleteByIdModel = async (id) => {
  const response = db.promise().query('DELETE FROM tasks WHERE id = ?', id);
  const [[rows]] = response;

  return rows;
};

module.exports = {
  taskCreateModel,
  taskGetAllModel,
  taskGetByIdModel,
  taskUpdateByIdModel,
  taskDeleteByIdModel,
};
