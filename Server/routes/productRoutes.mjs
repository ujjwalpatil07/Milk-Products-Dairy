import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/get-products", wrapAsync(getProducts))

export default router;
