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
  m_id: Number,
});

//user model
const users = mongoose.model("users", userSchema);

//add member function
app.post("/addMember", async (req, res) => {
  const data = new users({
    m_id: req.body.m_id,
    name: req.body.name,
    year: req.body.year,
    role: req.body.role,
    email: req.body.email,
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

//edit function
app.put("/editMember/:m_id", async (req, res) => {
  const { m_id } = req.params;
  const updateData = {
    name: req.body.name,
    email: req.body.email,
    year: req.body.year,
    role: req.body.role
  };

  try {
    const updatedUser = await users.findOneAndUpdate(
      { m_id: m_id }, //custom id that was created,
      { $set: updateData }, //passing in the updated dataset
      { new: true } //returns the updated dataset
    );
    if (!updatedUser) {
      return res.status(404).send("Member not found with the given id");
    }
    res.json(updatedUser);
  } catch (error) {
    console.error("Error in updating member: ", error);
    res.status(400).json({ message: error.message });
  }
});



