import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { addNewOrder, getAllUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/add", wrapAsync(addNewOrder));

router.get("/user", wrapAsync(getAllUserOrders));

export default router;