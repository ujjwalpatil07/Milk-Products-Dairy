import express from "express"
import wrapAsync from "../../utils/wrapAsync.js"
import { loginUser, signUpUser, verifyOtp, handleInfoInput, getUser, removeUserNotification } from "../../controllers/AuthController/authUser.js";
import {upload} from "../../config/cloudinary.js"

const router = express.Router();

router.post("/signup", wrapAsync(signUpUser));

router.post("/login", wrapAsync(loginUser));

router.post("/signup/otp-verification", wrapAsync(verifyOtp));

router.post("/signup/info-input", upload.single("photo"), wrapAsync(handleInfoInput));

router.post("/get-user", wrapAsync(getUser));

router.delete("/delete-notification", wrapAsync(removeUserNotification));

export default router;