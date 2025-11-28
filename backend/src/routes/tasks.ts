import { Router } from 'express';
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByEmployee
} from '../controllers/taskController';

const router = Router();

router.get('/', getTasks);
router.get('/employee/:employeeId', getTasksByEmployee);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;