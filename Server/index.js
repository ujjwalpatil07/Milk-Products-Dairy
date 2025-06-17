import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import AuthAdminRoute from "./routes/AuthRoutes/authAdminRoute.mjs";
import AuthUserRoute from "./routes/AuthRoutes/authUserRoute.mjs";
import ProfileEditRoute from "./routes/profileEditRoutes.mjs";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9001;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/admin", AuthAdminRoute);

app.use("/u", AuthUserRoute);

app.use("/user-profile", ProfileEditRoute);

app.get("*", (req, res) => {
  res.send({ result: "Hey, you are looking for a page that doesn't exist!" });
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
