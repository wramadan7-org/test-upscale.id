require('dotenv').config();
const httpStatus = require('http-status');

const taskAll = (req, res) => {
  res.status(200).send({
    status: httpStatus.OK,
    message: 'OK',
    data: [
      {
        name: 'Wahyu Ramadan',
        age: 22,
      },
    ],
  });
};

module.exports = {
  taskAll,
};
