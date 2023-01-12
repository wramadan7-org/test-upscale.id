require('dotenv').config();
const httpStatus = require('http-status');
const taskModel = require('../models/taskModel');

const taskAllController = async (req, res) => {
  try {
    const tasks = await taskModel.taskGetAllModel();

    res.status(200).send({
      status: httpStatus.OK,
      message: 'OK',
      data: tasks,
    });
  } catch (error) {
    res.status(httpStatus.CONFLICT).send({
      status: httpStatus.CONFLICT,
      message: error.message,
    });
  }
};

module.exports = {
  taskAllController,
};
