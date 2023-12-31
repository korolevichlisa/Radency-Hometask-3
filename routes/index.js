import express from 'express';
import TodoController from '../todosControllers/todos';

const router = express.Router();

router.get('/api/v1/notes', TodoController.getAllTodos);
router.get('/api/v1/notes/:id', TodoController.getTodo);
router.post('/api/v1/notes', TodoController.createTodo);
router.get('/api/v1/notesCat/', TodoController.getAggregated);
router.patch('/api/v1/notes/:id', TodoController.updateTodo);
router.delete('/api/v1/notes/:id', TodoController.deleteTodo);

export default router;