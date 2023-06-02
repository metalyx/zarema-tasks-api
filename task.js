const { Schema, model } = require("mongoose");

const Task = new Schema({
  text: { type: String },
  reminder: { type: Boolean },
  day: { type: String },
});

module.exports = model("Task", Task);
