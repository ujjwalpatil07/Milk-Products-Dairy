import express from "express"
import wrapAsync from "../../utils/wrapAsync.js"
import { getAdmin, loginAdmin } from "../../controllers/AuthController/authAdmin.js";


const router = express.Router();

router.post("/login", wrapAsync(loginAdmin));

router.post("/get-admin", wrapAsync(getAdmin));

export default router;