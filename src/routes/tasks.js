const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/tasks', TaskController.index);
router.get('/create', TaskController.create);
router.post('/create', TaskController.store);
router.get('/tasks/delete/:id', TaskController.destroy);
router.get('/tasks/edit/:id', TaskController.edit);
router.post('/tasks/edit/:id', TaskController.update);
router.get('/logs', TaskController.logs);

module.exports = router;