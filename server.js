const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");
const req = require("express/lib/request");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

mongoose.connect(process.env.MONGODB_LINK, () => {
  console.log("connected to mongodb");
});

const userSchema = {
  name: String,
  email: String,
  password: String,
};

const User = mongoose.model("users", userSchema);

const listSchema = {
  email: String,
  id: String,
  title: String,
  desc: String,
  date: String,
  completed: Boolean,
};

const List = mongoose.model("lists", listSchema);

//Signup route
app.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: password,
  });
  const email = req.body.email;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.send({
      status: 400,
      message: "User already exist",
    });
  } else {
    res.send({
      status: 200,
      message: "Registration successful",
    });
    newUser.save().catch((err) => res.status(400).json("Error: " + err));
  }
});

//login route
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    const ans = await bcrypt.compare(req.body.password, userExist.password);
    if (ans) {
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.JWT_SECRET
      );
      return res.json({
        status: 200,
        message: "Login Succesful",
        token: token
      });
    } else {
      res.send({
        status: 400,
        message: "Incorrect Password",
      });
    }
  } else {
    res.send({
      status: 400,
      message: "User does not exist. Please Register",
    });
  }
});

//userinfo
app.post("/userInfo/get", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  res.send(user);
});

app.post("/userPassword/update", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  const salt = await bcrypt.genSalt(10);
  const newpassword = await bcrypt.hash(req.body.npassword, salt);

  if (user) {
    const ans = await bcrypt.compare(req.body.cpassword, user.password);
    if (ans) {
      const response = await User.findOneAndUpdate(
        { email },
        { password: newpassword }
      );
      res.send({
        status: 200,
        message: "password updated successfully",
      });
    } else {
      res.send({ status: 400, message: "incorrect current password" });
    }
  } else {
    res.send({ status: 400, message: "invalid user" });
  }
});

app.post("/userName/update", async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (user) {
    const response = await User.findOneAndUpdate(
      { email },
      { name: req.body.name }
    );
    res.send({
      status: 200,
      message: "username updated successfully",
    });
  } else {
    res.send("invalid user");
  }
});

app.post("/deleteAccount", async (req, res) => {
  const id = req.body.id;
  const user = await User.findOneAndDelete({ _id: id });
  res.send("Account deleted successfully");
});

app.post("/listItem/add", async (req, res) => {
  const newItem = new List({
    email: req.body.email,
    title: req.body.listItem.title,
    desc: req.body.listItem.desc,
    date: req.body.listItem.date,
    completed: false,
  });
  newItem.save();
  res.send({ message: "item added successfully" });
});

app.post("/list/get", async (req, res) => {
  const email = req.body.email;
  const user = await List.find({ email: email });
  res.send(user);
});

app.post("/list/delete", async (req, res) => {
  const user = await List.findOneAndDelete({
    email: req.body.email,
    _id: req.body.id,
  });
  res.send({ message: "deleted successfully" });
});

app.post("/list/status/update", async (req, res) => {
  console.log(req.body);
  const user = await List.findOneAndUpdate(
    { email: req.body.email, _id: req.body.id },
    { completed: true }
  );
  res.send({ message: "updated successfully" });
});
app.post("/list/update", async (req, res) => {
  console.log(req.body);
  const user = await List.findOneAndUpdate(
    { email: req.body.email, _id: req.body.id },
    {
      title: req.body.title,
      desc: req.body.desc,
      date: req.body.date,
      completed: req.body.completed,
    }
  );
  res.send({ message: "updated successfully" });
});

app.listen(process.env.PORT, function () {
  console.log("Express is running on port: " + process.env.PORT);
});
