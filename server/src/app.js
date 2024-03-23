import mongoose from 'mongoose';
const express = require("express");
const app = express();
const mongoose = require("mongoose");
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


const { Schema } = mongoose;

const userSchema = new Schema({
  name: String, 
  email: String,
  id: Number
});
const users = mongoose.model('users', userSchema);

router.post('ADD', (req, res) => {
  const data = new userSchema({
      name: req.body.name,
      email: req.body.email,
      id: req.body.id,
  })
})
