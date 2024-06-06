import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  assigner: String,
  title: String,
  description: String,
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
