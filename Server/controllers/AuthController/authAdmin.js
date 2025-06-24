import mongoose from "mongoose";
import Admin from "../../models/AdminSchema.js";
import bcryptjs from "bcryptjs";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(400).json({ message: "Invalid Email Address." });
  }

  const isMatched = await bcryptjs.compare(password, admin.password);
  if (!isMatched) {
    return res.status(400).json({ message: "Wrong Password" });
  }

  res.status(200).json({
    message: "Login Successful",
    admin: { _id: admin?._id, email },
  });
};

export const getAdmin = async (req, res) => {
  const { _id } = req.body;

  if (!_id) {
    return res.status(400).json({ message: "_id is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({ message: "Invalid admin ID" });
  }

  const admin = await Admin.findById(_id);
  if (!admin) {
    return res.status(404).json({ message: "Admin not found" });
  }

  return res.status(200).json({ success: true, admin });
};
