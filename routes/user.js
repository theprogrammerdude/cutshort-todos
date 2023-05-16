const express = require("express");
const router = express.Router();

const { verifyJwt } = require("../jwt");

const UserModel = require("../models/user_model");
const TodoModel = require("../models/todo_model");

router.get("/", async (req, res) => {
  const token = req.headers.token;
  const data = verifyJwt(token);
  const id = data.id;

  const user = await UserModel.findById(id);

  if (user)
    return res.json({
      status: 200,
      msg: "User found",
      data: user,
    });
  else
    return res.json({
      status: 404,
      msg: "User not found",
    });
});

router.post("/add", async (req, res) => {
  const { content } = req.body;

  const token = req.headers.token;
  const data = verifyJwt(token);
  const id = data.id;

  const user = await UserModel.findById(id);
  const todo = new TodoModel({
    content,
  });

  user.todos.push(todo);
  user
    .save()
    .then(() => {
      return res.json({
        status: 200,
        msg: "Todo added",
        data: user.todos,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        msg: "Unexpected Error",
      });
    });
});

router.post("/delete", async (req, res) => {
  const { todoId } = req.body;

  const token = req.headers.token;
  const data = verifyJwt(token);
  const id = data.id;

  const user = await UserModel.findById(id);
  user.todos.splice(
    user.todos.findIndex((todo) => todo._id === todoId),
    1
  );

  user
    .save()
    .then(() => {
      return res.json({
        status: 200,
        msg: "Todo deleted",
        data: user.todos,
      });
    })
    .catch((err) => {
      return res.json({
        status: 500,
        msg: "Unexpected Error",
      });
    });
});

module.exports = router;
