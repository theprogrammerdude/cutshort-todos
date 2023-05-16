const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const { signJwt } = require("../jwt");

const UserModel = require("../models/user_model");

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ status: 500, msg: "User already exists in DB" });
  }

  try {
    await UserModel.create({
      email,
      password: passwordHash,
    });

    return res.json({
      status: 200,
      msg: "user created",
    });
  } catch (error) {
    console.log(error);

    return res.json({
      status: error.code,
      msg: "user created",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user)
    return res.json({
      status: 500,
      message: "User does not exists.",
    });

  if (await bcrypt.compare(password, user.password)) {
    const token = signJwt(user._id);
    return res.json({ status: "OK", data: token });
  } else {
    return res.json({
      status: 500,
      message: "Invalid username/password",
    });
  }
});

module.exports = router;
