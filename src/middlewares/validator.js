/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
const { validationResult } = require('express-validator');
const httpStatus = require('http-status');

// Parallel processing
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const error = validationResult(req);

  if (error.isEmpty()) {
    return next();
  }

  const data = {
    details: error.array(),
  };

  res.sendWrapped('Invalid value', data, httpStatus.BAD_REQUEST);
};

module.exports = validate;
