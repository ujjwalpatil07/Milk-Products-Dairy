import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { upload } from "../config/cloudinary.js";
import { addNewProduct } from "../controllers/inventoryController.js";

const router = express.Router();

router.put("/add-product", upload.single("image"), wrapAsync(addNewProduct))

export default router;
