/* eslint-disable import/no-extraneous-dependencies */
const { body } = require('express-validator');

const createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
  body('description')
    .optional(true)
    .default(null),
  body('completed')
    .isBoolean()
    .optional(true)
    .default(false)
    .withMessage('Completed is boolean'),
];

const updateTaskValidation = [
  body('title')
    .isString()
    .optional(true)
    .withMessage('Title is string'),
  body('description')
    .isString()
    .optional(true)
    .default(null)
    .withMessage('Description is string'),
  body('completed')
    .isBoolean()
    .optional(true)
    .default(false)
    .withMessage('Completed is boolean'),
];

module.exports = {
  createTaskValidation,
  updateTaskValidation,
};
