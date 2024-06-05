import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const app = express();

app.use(express.urlencoded({ extended: true })); // use to collect form data from the client
app.use(bodyParser.json()); // use to parse JSON bodies
mongoose
  .connect(
    'mongodb+srv://shreyasavaliya2801:Shreya0801@cluster0.ja95ybi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
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

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Get a single todo
app.get('/todos?id=:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(404).send('Todo not found');
    } else {
      console.log(todo, 'todo by id');
      res.json(todo);
    }
  } catch (err) {
    res.status(500).send('Internal Server Error');
  }
});

// Create a todo
app.post('/todos', async (req, res) => {
  const { assigner, title, description } = req.body;
  try {
    const newTodo = new Todo({
      assigner,
      title,
      description,
    });

    const savedTodo = await newTodo.save();
    console.log(savedTodo);
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).send('Bad Request');
  }
});

// Update a todo
app.put('/todos?id=:id', async (req, res) => {
  const { assigner, title, description } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {
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
});

// Delete a todo
app.delete('/todos?id=:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    console.log(deletedTodo)
    if (!deletedTodo) {
      res.status(404).send('Todo not found');
    } else {
      res.status(204).send('Todo deleted successfully');
    }
  } catch (err) {
    res.status(400).send('Bad Request');
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
