const { Router } = require('express');
const taskController = require('../../controllers/taskController');

const router = Router();

router.get('/', taskController.taskAllController);

module.exports = router;
