import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { addNewOrder, confirmOrder, getAllOrders, getAllUserOrders, getAdminOrders, rejectOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/new-order", wrapAsync(addNewOrder));

router.post("/get-user-orders", wrapAsync(getAllUserOrders));

router.post("/get-all-orders", wrapAsync(getAllOrders));

router.post("/get-admin-orders", wrapAsync(getAdminOrders));

router.put("/confirm-order", wrapAsync(confirmOrder));

router.put("/reject-order", wrapAsync(rejectOrder));

export default router;