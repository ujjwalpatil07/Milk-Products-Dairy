import express from "express"
import wrapAsync from "../../utils/wrapAsync.js"
import { loginAdmin } from "../../controllers/AuthController/authAdmin.js";


const router = express.Router();

router.post("/admin/login", wrapAsync(loginAdmin))

export default router;