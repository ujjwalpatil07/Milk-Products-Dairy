import express from "express"
import wrapAsync from "../../utils/wrapAsync.js"
import { getAdmin, handleAdminUpdatePassword, loginAdmin, removeAdminNotification } from "../../controllers/AuthController/authAdmin.js";
import { loginLimiter } from "../../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/login", loginLimiter, wrapAsync(loginAdmin));

router.post("/get-admin", loginLimiter, wrapAsync(getAdmin));

router.delete("/delete-notification", wrapAsync(removeAdminNotification));

router.post("/update-password", wrapAsync(handleAdminUpdatePassword));

export default router;