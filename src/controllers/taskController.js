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

    res.sendWrapped('Task successfully created', task, httpStatus.CREATED);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

const taskAllController = async (req, res) => {
  try {
    const tasks = await taskModel.taskGetAllModel();

    res.sendWrapped('List task', tasks, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

const taskGetByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.taskGetByIdModel(id);

    if (!task) throw new ApiError('Task not found', httpStatus.NOT_FOUND);

    res.sendWrapped(`Task with ID ${id}`, task, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

const taskUpdateByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;

    const checkTask = await taskModel.taskGetByIdModel(id);

    if (!checkTask) throw new ApiError('Task not found', httpStatus.NOT_FOUND);

    if (requestBody.completed !== null && requestBody.completed !== undefined) {
      Object.assign(requestBody, { is_completed: requestBody.completed });
      delete requestBody.completed;
    }

    const task = await taskModel.taskUpdateByIdModel(requestBody, id);

    res.sendWrapped(`Task with ID ${id} successfully updated`, task, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

const taskDeleteByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.taskGetByIdModel(id);

    if (!task) throw new ApiError('Task not found', httpStatus.NOT_FOUND);

    await taskModel.taskDeleteByIdModel(id);

    res.sendWrapped(`Task with ID ${id} successfully deleted`, null, httpStatus.OK);
  } catch (error) {
    res.sendWrapped(error.message, null, error.statusCode);
  }
};

module.exports = {
  taskCreateController,
  taskAllController,
  taskGetByIdController,
  taskUpdateByIdController,
  taskDeleteByIdController,
};
