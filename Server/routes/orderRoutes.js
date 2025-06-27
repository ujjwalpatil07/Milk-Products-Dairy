import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { getAllOrders, getAllUserOrders, getAdminOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/get-user-orders", wrapAsync(getAllUserOrders));

router.post("/get-all-orders", wrapAsync(getAllOrders));

router.post("/get-admin-orders", wrapAsync(getAdminOrders));

export default router;