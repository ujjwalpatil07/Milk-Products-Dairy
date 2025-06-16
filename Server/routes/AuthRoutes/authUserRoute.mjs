import express from "express"
import wrapAsync from "../../utils/wrapAsync.js"
import { loginUser, signUpUser, verifyOtp, handleInfoInput } from "../../controllers/AuthController/authUser.js";
import {upload} from "../../config/cloudinary.js"

const router = express.Router();

router.post("/u/signup", wrapAsync(signUpUser));
router.post("/u/login", wrapAsync(loginUser));
router.post("/u/signup/otp-verification", wrapAsync(verifyOtp));
router.post("/u/signup/info-input", upload.single("photo"), wrapAsync(handleInfoInput));


export default router;