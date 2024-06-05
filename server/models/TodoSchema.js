import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Database Connected Successfully!!');
  })
  .catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
  });

const todoSchema = new mongoose.Schema({
  assigner: String,
  title: String,
  description: String,
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
