import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { addNewOrder, getAllOrders, getAllUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/new-order", wrapAsync(addNewOrder));

router.post("/get-user-orders", wrapAsync(getAllUserOrders));

router.post("/get-all-orders", wrapAsync(getAllOrders))

export default router;