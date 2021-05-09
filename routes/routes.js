const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Todo = require("../model/Todo");

//router for adding a new todo
router.post("", async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    complete: req.body.complete,
  });

  try {
    const saveTodo = await newTodo.save();
    res.status(201).json(saveTodo);
    console.log("router post success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for getting all todos from the db
router.get("", async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json(todos);

    console.log("router get success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for updating a todo with a specific id
router.patch("/:id", async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      { _id: req.params.id },
      { $set: { text: req.body.text, complete: req.body.complete } }
    );

    res.status(200).json(updateTodo);

    console.log("router put success");
  } catch (error) {
    res.json({ message: error });
  }
});

//router for deleting a todo with a specific id
router.delete("/:id", async (req, res) => {
  try {
    const removeTodo = await Todo.remove({ _id: req.params.id });

    res.status(200).json(removeTodo);

    console.log("router delete success");
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
