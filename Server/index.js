import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import AuthAdminRoute from "./routes/AuthRoutes/authAdminRoute.mjs"
import AuthUserRoute from "./routes/AuthRoutes/authUserRoute.mjs"
import ProfileEditRoute from "./routes/profileEditRoutes.mjs"

dotenv.config();

const app = express();
const port = process.env.PORT || 9001;
const dbUrl = process.env.DB_URL;

app.use(cors());
app.use(express.json());

mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB Connection Error: ", err);
  });

app.get("*", (req, res) => {
  res.send({ result: "Hey, you are looking for a page that doesn't exist!" });
});

app.use("/", AuthAdminRoute)
app.use("/", AuthUserRoute)
app.use("/", ProfileEditRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
