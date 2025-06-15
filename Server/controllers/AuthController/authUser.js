import User from "../../models/UserSchema.js";
import bcryptjs from "bcryptjs";

export const verifyOtp = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log("Sending OTP to:", email);

    const hashedPass = await bcryptjs.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPass,
    });

    await newUser.save();

    res.status(201).json({
      message: "Account Created Successfully",
      success: true,
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const handleInfoInput = async (req, res) => {
  try {
    const { id } = req.body;

    const profileInfo = JSON.parse(req.body.profileInfo); 

    const photoUrl = req.file?.path;

    if (!photoUrl) {
      return res
        .status(400)
        .json({ success: false, message: "Photo upload failed" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...profileInfo,
        photo: photoUrl,
      },
      { new: true }
    );


    res
      .status(201)
      .json({ success: true, message: "User updated", user: updatedUser });
  } catch (error) {
    console.log("Error uploading profile info:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const signUpUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    res.status(201).json({
      message: "User info is Correct",
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isMatched = await bcryptjs.compare(password, user.password);

    if (!isMatched) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    res.status(200).json({
      message: "Login Successful",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
