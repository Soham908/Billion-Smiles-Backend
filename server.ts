import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import userPreferenceRoute from './routes/userPreferenceRoute';
import campaignRoute from './routes/campaignRoute';
import postRoute from './routes/postRoute';
import commentRoute from './routes/postInteractionRoute';
import causeRoute from './routes/causeRoute';
dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI!, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error: Error) => {
    console.error(error);
  });

// Middleware setup
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoute);
app.use("/user-cause-preference", userPreferenceRoute);
app.use("/campaign", campaignRoute);
app.use("/posts", postRoute);
app.use("/posts/post-interaction", commentRoute);
app.use("/cause", causeRoute);

// Root route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: 'Reached backend of Billion Smiles' });
});

app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});
