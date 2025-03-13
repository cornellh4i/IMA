import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI! Set it in your environment variables.");
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
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
}

const userSchema = new mongoose.Schema<IUser>(
  {
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
  },
  { collection: "Users" }
);

// User model
const UserModel = mongoose.model<IUser>("Users", userSchema);

// Add member function
app.post("/addMember", async (req: Request, res: Response): Promise<any> => {
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
  });
  try {
    const savedData = await data.save();
    res.status(200).json(savedData);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// Delete all function
app.delete("/deleteAll", async (req: Request, res: Response): Promise<any> => {
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

//  Get member 
app.get("/getMember", async (req: Request, res: Response): Promise<any> => {
  UserModel.find(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
});

// Get all members for filtering and individual categories
app.get("/getAllMembers", async (req: Request, res: Response): Promise<any> => {
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

// Get member by name
app.get(
  "/getMemberByName/:name",
  async (req: Request, res: Response): Promise<any> => {
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
  }
);

// TODO Pair 1: (DELETE) Write and implement the Delete memember by name route
app.delete("/deleteMemberById/:id", async (req: Request, res: Response): Promise<any> => {
  UserModel.findByIdAndDelete(req.params.id, function(err:any, docs:any) {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving members");
    } else {
      console.log(docs);
      res.send(docs);
    }
  });
}
);

// TODO Pair 2: (PUT) Write and implement the Update member route

app.put("/updateMember/:id", async (req: Request, res: Response): Promise<any> => {
  // name, pronouns, role, location, year, major, bio, imgURL, email, linkedin, slack
     const userId = req.params.id;
     const updateData = req.body;
  
     try {
      const updatedMember = await UserModel.findByIdAndUpdate(userId, updateData).exec(); 
      res.status(200).json(updatedMember);
      
     } catch (error: any) {
      res.status(400).json({message: error.message});
     }
  
  })