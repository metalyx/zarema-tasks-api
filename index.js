const express = require("express");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
const cors = require("cors");
const Task = require("./task");
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);

    const task = await Task.findById(id);

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      { new: true }
    );

    res.status(200).json(task);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});
app.post("/tasks", async (req, res) => {
  try {
    const body = req.body;

    const task = await Task.create(body);

    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ message: "Server Error" });
  }
});

const start = async () => {
  try {
    console.log("connecting to db");
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@cluster0.opqjejb.mongodb.net/`
    );
    app.listen(PORT, () => console.log(`server started, port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
