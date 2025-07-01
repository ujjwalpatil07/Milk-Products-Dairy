import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getProducts, getRecentReview, likeProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/get-products", wrapAsync(getProducts))

router.put("/like/:productId", wrapAsync(likeProduct));

router.get("/recent-reviews", wrapAsync(getRecentReview));

export default router;
