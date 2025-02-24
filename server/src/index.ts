import express, { Application, Request, Response } from "express";
import cors from "cors";
import mongoose, { Schema, Document, Model } from "mongoose";

const app: Application = express();
app.use(cors());
app.use(express.json());

const MONGO_URI =
  "mongodb+srv://bsl77:<db_password>@ima.d3rmp.mongodb.net/?retryWrites=true&w=majority&appName=IMA";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
};

connectDB();

interface IUser extends Document {
  name: string;
  pronouns: string;
  role: string;
  location: string;
  year: string;
  major: string;
  bio: string;
  imgURL: string;
  email: string;
  linkedin?: string;
  slack?: string;
  m_id: number;
}

const UserSchema: Schema = new Schema<IUser>({
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
const User: Model<IUser> = mongoose.model<IUser>("users", UserSchema);

//add member function
app.post("/addMember", async (req: Request, res: Response) => {
  const data = new User({
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
    res.status(400).json({ message: (error as Error).message });
  }
});

//deleteAll function
app.delete("/deleteAll", (req: Request, res: Response) => {
  console.log("trying to delete docs");
  User.deleteMany({})
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
  // eslint-disable-next-line array-callback-return
  User.find(function (err, docs) {
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
    const query = User.find(JSON.parse(queryStr));
    const member = await query;
    res.send(member);
  } catch (error) {
    console.log(error);
    res.status(500).send((error as Error).message);
  }
});

app.get("/getMemberByName/:name", function (req: Request, res: Response) {
  User.find({ name: req.params.name }, function (err: any, docs: any) {
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
