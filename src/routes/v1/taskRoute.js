const { Router } = require('express');
const taskController = require('../../controllers/taskController');
const validator = require('../../middlewares/validator');
const { createTaskValidation, updateTaskValidation } = require('../../validations/taskValidation');

const router = Router();

router.post('/', validator(createTaskValidation), taskController.taskCreateController);
router.get('/', taskController.taskAllController);
router.get('/:id', taskController.taskGetByIdController);
router.patch('/:id', validator(updateTaskValidation), taskController.taskUpdateByIdController);
router.delete('/:id', taskController.taskDeleteByIdController);

module.exports = router;
