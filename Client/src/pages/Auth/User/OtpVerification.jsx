import React, { useState, useRef, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { verifyUserOTP } from "../../../services/userService";

export default function OtpVerification() {

  const navigate = useNavigate();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const formData = location?.state?.formData;

  useEffect(() => {
    if (!formData) {
      navigate("/signup");
    }
  }, [formData, navigate]);

  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 4) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 5) {
      enqueueSnackbar("Please enter a valid 5-digit OTP", { variant: "error" });
      return;
    }

    setLoading(true);
    try {
      const data = await verifyUserOTP(formData);

      if (data?.success) {
        localStorage.setItem("User", JSON.stringify(data?.user));
        enqueueSnackbar("User signed up successfully", { variant: "success" });
        navigate("/signup/info-input");
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "User already exists or server error.", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row min-h-screen transition bg-[#f5f5f5] dark:bg-[#121212] items-center justify-center px-4 py-10`}>
      <div className="w-full md:w-[40%] bg-white dark:bg-gray-500/20 rounded-2xl shadow-2xl p-8 max-w-md transition">
        <button
          className="text-sm text-gray-600 dark:text-gray-300 flex items-center cursor-pointer hover:text-[#843E71] transition"
          onClick={() => navigate("/signup")}
        >
          <i className="fa-solid fa-arrow-left me-3"></i>Back to Signup Page
        </button>

        <h1 className="text-3xl font-semibold mt-6 text-[#843E71] dark:text-white">Verify OTP</h1>
        <p className="text-sm mt-4 text-gray-600 dark:text-gray-300">
          An authentication code has been sent to your email. Enter the 5-digit OTP below to verify.
        </p>

        <div id="otp-input" className="flex justify-between mt-8 space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index * 0.6}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={`${loading ? "cursor-not-allowed" : "cursor-text"} h-14 w-12 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-[#843E71] transition`}
              />
          ))}
        </div>

        <div className="mt-5 text-sm flex justify-center text-gray-600 dark:text-gray-400">
          <p>Didn't receive OTP?&nbsp;</p>
          <button
            onClick={() => enqueueSnackbar("Resend OTP functionality not implemented yet.", { variant: "info" })}
            className="text-[#FF8682] font-semibold hover:underline hover:text-[#e2595b]"
          >
            Resend OTP
          </button>
        </div>

        <Button
          variant="contained"
          onClick={handleVerify}
          disabled={loading}
          className="w-full !mt-6 font-semibold !bg-[#843E71] hover:!bg-[#6f3260] transition"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
        </Button>
      </div>

      <div className="hidden md:flex w-[50%] h-full justify-center items-center">
        <img
          src="https://img.freepik.com/free-vector/otp-concept-illustration_114360-7882.jpg"
          alt="OTP Illustration"
          className="w-[80%] max-h-[400px] object-contain dark:invert"
        />
      </div>
    </div>
  );
}