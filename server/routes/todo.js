const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().limit(10);
    res.json(todos);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    isComplete: req.body.isComplete,
  });

  todo
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

router.delete("/:todoID", async (req, res) => {
  try {
    const removedTodo = await Todo.findByIdAndDelete({
      _id: req.params.todoID,
    });
    res.json(removedTodo);
  } catch (error) {
    res.json({ message: error });
  }
});

router.patch("/:todoID", async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      { _id: req.params.todoID },
      { $set: { isComplete: req.body.isComplete } }
    );
    res.json(updateTodo);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
