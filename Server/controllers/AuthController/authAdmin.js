import Admin from "../../models/AdminSchema.js"
import bcryptjs from "bcryptjs";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    const isMatched = await bcryptjs.compare(password, admin.password);
    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }

    res.status(200).json({
      message: "Login Successful",
      admin: {
        email: admin.email,
        name: admin.name,
        id: admin._id,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
