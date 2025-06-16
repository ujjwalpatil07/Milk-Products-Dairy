import express from "express"
import wrapAsync from "../utils/wrapAsync.js"
import { editProfile, getProfileData, getAddresses, saveNewAddress, deleteAddress, editAddress } from "../controllers/profileEdit.js";
const router = express.Router();

router.put("/u/profile/edit", wrapAsync(editProfile))
router.post("/u/get-addresses", wrapAsync(getAddresses))
router.post("/u/profile", wrapAsync(getProfileData))
router.post("/u/add-address", wrapAsync(saveNewAddress))
router.post("/u/remove-address", wrapAsync(deleteAddress))
router.put("/u/edit-address", wrapAsync(editAddress))

export default router;