import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

mongoose
  .connect(
    "mongodb+srv://bsl77:h4i-cornell-ima@ima.d3rmp.mongodb.net/?retryWrites=true&w=majority&appName=IMA",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));
app.listen(8000, () => {
  console.log("on port 8000");
});

interface IUser extends mongoose.Document {
  name: string;
  pronouns: string;
  role: string;
  location: string;
  year: string;
  major: string;
  bio: string;
  imgURL: string;
  email: string;
  linkedin: string;
  slack: string;
  m_id: number;
}

const userSchema = new mongoose.Schema<IUser>({
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
  m_id: { type: Number, required: true, unique: true },
});

//user model
const UserModel = mongoose.model<IUser>("User", userSchema);

//add member function
app.post("/addMember", async (req: Request, res: Response) => {
  const data = new UserModel({
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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

//deleteAll function
app.delete("/deleteAll", async (req: Request, res: Response) => {
  console.log("trying to delete docs");
  UserModel.deleteMany({})
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
app.get("/getMember", function (req: Request, res: Response) {
  UserModel.find(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
});

//get members for filtering and individual categories as well.
app.get("/getAllMembers", async (req: Request, res: Response) => {
  try {
    const queryObj = { ...req.query };
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const query = UserModel.find(JSON.parse(queryStr));
    const member = await query;
    res.send(member);
  } catch (error: any) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/getMemberByName/:name", function (req: Request, res: Response) {
  UserModel.find({ name: req.params.name }, function (err: any, docs: any) {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving members");
    } else {
      console.log(req.params.name);
      console.log(docs);
      res.send(docs);
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
