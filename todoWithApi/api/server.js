const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { json } = require("body-parser");
const { nanoid } = require("nanoid");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(cors());
app.use(json());

let todos = [
  {
    id: nanoid(),
    title: "Learn HTML",
    completed: true,
  },
  {
    id: nanoid(),
    title: "Learn CSS",
    completed: true,
  },
  {
    id: nanoid(),
    title: "Learn JavaScript",
    completed: true,
  },
  {
    id: nanoid(),
    title: "Learn React",
    completed: true,
  },
  {
    id: nanoid(),
    title: "Learn Redux",
    completed: false,
  },
  {
    id: nanoid(),
    title: "Learn TypeScript",
    completed: false,
  },
  {
    id: nanoid(),
    title: "Learn Node JS ",
    completed: false,
  },
];

app.get("/todos", (req, res) => res.send(todos));

app.post("/todos", (req, res) => {
  const todo = { title: req.body.title, id: nanoid(), completed: false };
  todos.push(todo);
  return res.send(todo);
});

app.patch("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  const completed = Boolean(req.body.completed);
  if (index > -1) todos[index].completed = completed;

  return res.send(todos[index]);
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params.id;
  const index = todos.findIndex((todo) => todo.id == id);
  if (index > -1) todos.splice(index, 1);

  res.send(todos);
});

const PORT = 7000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
