import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import { addNewOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/add", wrapAsync(addNewOrder));


export default router;