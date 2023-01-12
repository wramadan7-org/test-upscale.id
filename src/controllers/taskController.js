require('dotenv').config();
const httpStatus = require('http-status');
const ApiError = require('../helpers/ApiError');
const taskModel = require('../models/taskModel');

const taskCreateController = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const data = [title, description || null, completed];

    const task = await taskModel.taskCreateModel(data);

    if (!task.affectedRows) {
      throw new ApiError('Fail to insert into database', httpStatus.CONFLICT);
    }

    res.sendWrapped('OK', task, httpStatus.CREATED);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

const taskAllController = async (req, res) => {
  try {
    const tasks = await taskModel.taskGetAllModel();

    res.sendWrapped('List taks', tasks, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

const taskGetByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.taskGetByIdModel(id);

    if (!task) throw new ApiError('Tasks not found', httpStatus.NOT_FOUND);

    res.sendWrapped(`Tasks with ID ${id}`, task, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

module.exports = {
  taskCreateController,
  taskAllController,
  taskGetByIdController,
};
