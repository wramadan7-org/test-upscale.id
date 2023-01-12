const { Router } = require('express');
const taskController = require('../../controllers/taskController');

const router = Router();

router.get('/', taskController.taskAll);

module.exports = router;
