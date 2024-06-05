import express from "express";
import TodoController from "../controllers/TodoController";
const router = express.Router();

//Get All Todos
router.get('/', TodoController.getAllTodoData);

// Get a single todo
router.get('/todos?id=:id', TodoController.getSingleTodoData);

// Create a todo
router.post('/todos', TodoController.createTodo);

// Update a todo
router.put('/todos?id=:id', TodoController.updateTodo);

// Delete a todo
router.delete('/todos/:id', TodoController.deleteTodo);

export default router;