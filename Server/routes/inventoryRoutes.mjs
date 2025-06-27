import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { upload } from "../config/cloudinary.js";
import {
  updateProduct,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.put("/update-product", upload.single("image"), wrapAsync(updateProduct));

export default router;
