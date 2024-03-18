const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Comments = require("./models/comments.js");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

mongoose
  .connect(
    "mongodb+srv://Usmon:17032009aA@usmon.dqfejre.mongodb.net/?retryWrites=true&w=majority&appName=Usmon"
  )
  .then(() => console.log("MongoDB connected"))
  .catch(() => console.log("Error connecting to MongoDB"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/comments", async (req, res) => {
  await Comments.find()
    .then((r) => res.json(r))
    .catch((err) => res.status(500).json({ message: "Error: " + err }));
});

app.post("/comments", async (req, res) => {
  const comment = new Comments({
    comment: req.body.comment,
  });
  await comment
    .save()
    .then(() =>
      res.status(200).json({ message: "Comment posted successfully" })
    )
    .catch((err) => res.status(500).json({ message: "Error: " + err }));
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
