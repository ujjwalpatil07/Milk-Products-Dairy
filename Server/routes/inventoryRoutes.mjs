import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { upload } from "../config/cloudinary.js";
import { addNewProduct, updateProduct } from "../controllers/inventoryController.js";

const router = express.Router();

router.put("/add-product", upload.single("image"), wrapAsync(addNewProduct))
router.put("/update-product", upload.single("image"), wrapAsync(updateProduct));

export default router;
