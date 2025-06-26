import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { deleteReview, editReview, getProducts, likeProduct, productReviewLike } from "../controllers/productController.js";

const router = express.Router();

router.get("/get-products", wrapAsync(getProducts))

router.put("/like/:productId", wrapAsync(likeProduct));

router.put("/review/like", wrapAsync(productReviewLike));

router.put("/edit-review/:reviewId", wrapAsync(editReview));

router.delete("/delete-review/:reviewId/:productId", wrapAsync(deleteReview));

export default router;
