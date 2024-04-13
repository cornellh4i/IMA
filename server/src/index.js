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
  year: String,
  role: String,
  email: String,
  id: Number,
});

//user model
const users = mongoose.model("users", userSchema);

//add member function
app.post("/addMember", async (req, res) => {
  const data = new users({
    name: req.body.name,
    year: req.body.year,
    role: req.body.role,
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
 app.get('/getMember', function (req, res) {

    users.find(function (err, docs) { 
        if (err){ 
            console.log(err); 
        } 
        else{ 
            console.log(docs); 
            res.send(docs)
        } 
    }); 
})

app.get('/getMemberByName', function (req, res) {

  users.find({ name: req.body.name }, function (err, docs) {
      if (err) {
          console.log(err);
          res.status(500).send('Error retrieving members');
      } else {
          console.log(docs);
          res.send(docs);
      }
  });
});