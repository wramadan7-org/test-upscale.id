const db = require('../configs/db');

const taskGetAllModel = async () => {
  try {
    const response = await db.promise().query('SELECT * FROM tasks');
    const [rows] = response;
    return rows;
  } catch (error) {
    console.log(error);
    return error.sqlMessage;
  }
};

module.exports = {
  taskGetAllModel,
};
