import Todo from '../models/TodoSchema.js';

class TodoController {
  // Method to get all todos
  static getAllTodoData = async (req, res) => {
    try {
      const todos = await Todo.find(); // Find all todos in the database
      res.json(todos);
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  };

  // Method to get a single todo by ID
  static getSingleTodoData = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id); // Find todo by ID
      if (!todo) {
        res.status(404).send('Todo not found');
      } else {
        res.json(todo);
      }
    } catch (err) {
      res.status(500).send('Internal Server Error');
    }
  };

  // Method to create a new todo
  static createTodo = async (req, res) => {
    const { assigner, title, description } = req.body;
    try {
      const newTodo = new Todo({
        // Create a new todo object
        assigner,
        title,
        description,
      });

      const savedTodo = await newTodo.save(); // Save the new todo to the database
      console.log(savedTodo);
      res.status(201).json(savedTodo);
    } catch (err) {
      res.status(400).send('Bad Request');
    }
  };

  // Method to update an existing todo
  static updateTodo = async (req, res) => {
    const { assigner, title, description } = req.body;
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
        // Find and update todo by ID
        assigner,
        title,
        description,
      });
      if (!updatedTodo) {
        res.status(404).send('Todo not found');
      } else {
        res.json(updatedTodo);
      }
    } catch (err) {
      res.status(400).send('Bad Request');
    }
  };

  // Method to delete a todo
  static deleteTodo = async (req, res) => {
    try {
      const deletedTodo = await Todo.findByIdAndDelete(req.params.id); // Find and delete todo by ID

      if (!deletedTodo) {
        res.status(404).send('Todo not found');
      } else {
        res.status(204).send('Todo deleted successfully');
      }
    } catch (err) {
      res.status(400).send('Bad Request');
    }
  };
}

export default TodoController;
