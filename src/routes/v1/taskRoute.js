const { Router } = require('express');
const taskController = require('../../controllers/taskController');

const router = Router();

router.post('/', taskController.taskCreateController);
router.get('/', taskController.taskAllController);
router.get('/:id', taskController.taskGetByIdController);

module.exports = router;
