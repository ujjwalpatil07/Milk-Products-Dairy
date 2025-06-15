import Address from "../models/AddressShema.js";
import User from "../models/UserSchema.js";

export const getProfileData = async (req, res) => {
  const { profile_id } = req.body;

  if (!profile_id) {
    return res.status(400).json({
      success: false,
      message: "Profile ID is required",
    });
  }

  try {
    const user = await User.findById(profile_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      userData: user,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
      error: error.message,
    });
  }
};

export const editProfile = async (req, res) => {
  const { editData, userId } = req.body;

  if (!userId || !editData) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required data" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: editData },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      newUser: updatedUser,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAddresses = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "Missing user id" });
  }

  try {
    const user = await User.findById(userId).populate("savedAddresses");

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User Not Found",
        newUser: updatedUser,
      });
    }

    const userAddresses = user.savedAddresses;

    res.status(200).json({
      success: true,
      message: "Addresses fetched successfully",
      userAddresses: userAddresses,
    });
  } catch (error) {
    console.error("Addresses fetching error", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const saveNewAddress = async (req, res) => {
  let { userId, address } = req.body;

  if (!userId || !address) {
    return res.status(400).json({
      success: false,
      message: "Fields missing",
    });
  }

  try {
    const newAddress = new Address({
      owner: userId,
      ...address,
    });

    await newAddress.save();

    await User.findByIdAndUpdate(userId, {
      $push: {
        savedAddresses: newAddress._id,
      },
    });

    res.status(200).json({
      success: true,
      message: "Address saved successfully",
      address: newAddress,
    });
  } catch (error) {
    console.error("Error while adding new address", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  const { addressId, userId } = req.body;

  if (!addressId || !userId) {
    return res.status(400).json({
      success: false,
      message: "Address ID or User ID is missing",
    });
  }

  try {
    await Address.findByIdAndDelete(addressId);

    await User.findByIdAndUpdate(userId, {
      $pull: { savedAddresses: addressId },
    });

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const editAddress = async (req, res) => {
  const { addressId, updatedData } = req.body;

  if (!addressId || !updatedData) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    await Address.findByIdAndUpdate(addressId, updatedData, { new: true });
    return res
      .status(200)
      .json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.error("Update failed:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
}


