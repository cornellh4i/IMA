const express = require("express");
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const { Schema } = mongoose;
app.use(cors());
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
app.listen(8000, () => {
  console.log("on port 8000");
});

const userSchema = new mongoose.Schema({
  name: String,
  pronouns: String,
  role: String,
  location: String,
  year: String,
  major: String,
  bio: String,
  imgURL: String,
  email: String,
  linkedin: String,
  slack: String,
  m_id: Number,
});

//user model
const users = mongoose.model("users", userSchema);

//add member function
app.post("/addMember", async (req, res) => {
  const data = new users({
    name: req.body.name,
    pronouns: req.body.pronouns,
    role: req.body.role,
    location: req.body.location,
    year: req.body.year,
    major: req.body.major,
    bio: req.body.bio,
    imgURL: req.body.imgURL,
    email: req.body.email,
    linkedin: req.body.linkedin,
    slack: req.body.slack,
    m_id: req.body.m_id,
  });
  try {
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//deleteAll function
app.delete("/deleteAll", (req, res) => {
  console.log("trying to delete docs");
  users
    .deleteMany({})
    .then((result) => {
      console.log(`${result.deletedCount} documents were deleted.`);
      res
        .status(200)
        .json({ message: `${result.deletedCount} documents were deleted.` });
    })
    .catch((error) => {
      console.error(`An error occurred: ${error.message}`);
      res.status(500).json({ message: `An error occurred: ${error.message}` });
    });
  console.log("skip");
});

//  Get all Method
app.get("/getMember", function (req, res) {
  users.find(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
});


//get members for filtering and individual categories as well.
app.get("/getAllMembers", async (req, res) => {
  try {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = users.find(JSON.parse(queryStr));
    const member = await query;
    res.send(member);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get('/getMemberByName/:name', function (req, res) {
  users.find({ name: req.params.name }, function (err, docs) {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving members');
    } else {
      console.log(req.params.name)
      console.log(docs);
      res.send(docs);
    }
  });
});