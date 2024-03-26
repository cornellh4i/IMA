const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
app.use(express.json());
mongoose.connect(
  "mongodb+srv://h4i-ima:h4iIMA2024@ima.pejjbfw.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("connected to db");
    } else {
      console.log(err);
    }
  }
);
app.listen(3000, () => {
  console.log("on port 3000");
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  id: Number,
});

const users = mongoose.model("users", userSchema);

//add member function, have to test
app.post("/addMember", async (req, res) => {
  const data = new users({
    name: req.body.name,
    email: req.body.email,
    id: req.body.id,
  });
  try {
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//deleteAll function, have to test
app.delete("/deleteAll", (req, res) => {
  console.log("trying to delete docs");
  try {
    const data = users.deleteMany();
    if (data.deletedCount === 0) {
      res.send("No documents found to delete");
    } else {
      res.send(`All data deleted.`);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
