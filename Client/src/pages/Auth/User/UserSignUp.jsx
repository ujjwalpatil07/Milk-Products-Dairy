import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";

export default function UserSignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSumbit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      if (formData.password !== formData.confirmPassword) {
        return toast.error("Please enter the correct password")
        
      }
      const res = await axios.post("http://localhost:9000/u/signup", {...formData});
      if (res.status === 201 || res.status === 200) {
        navigate("/signup/otp-verification", {state : {formData}});
        toast.success("OTP sent successfully");
        // navigate("/login");
        setFormData({ email: "", password: "", confirmPassword: "" });
      } else {
        toast.error("Something went wrong. Try again.");
      }
    } catch (error) {
        toast.error(error?.response?.data?.message || "User already exists or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl px-6 py-10 w-full max-w-lg">
        <form className="flex flex-col items-center w-full" onSubmit={handleFormSumbit}>
          <div className="flex flex-col items-center w-full px-3 gap-2 mb-6">
            <div className="flex justify-between bg-[#D595C3] w-full rounded-lg my-2 p-1">
              <button className="w-[48%] font-semibold p-1 text-center bg-white rounded-lg">User</button>
              <button className="w-[48%] font-semibold p-1 text-center rounded-lg cursor-pointer" onClick={() => {
                navigate("/admin/login")
              }}>Admin</button>
              
            </div>
            <h1 className="text-2xl font-bold">User Signup</h1>
          </div>

          <div className="w-full flex flex-col gap-5">
            <TextField
              id="email"
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
            />
            <div className="relative w-full">
              <TextField
                id="password"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"} // toggle visibility
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />

              <i
                className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <div className="relative w-full">
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type={showPassword ? "text" : "password"} // toggle visibility
                value={formData.confirmPassword}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
              />

              <i
                className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>

            <div className="text-sm font-semibold mb-3 text-[#FF8682] hover:underline">
              <div className="flex items-center"> <input type="checkbox" className="me-2" /> I agree to all Terms and Privacy Policies </div>
            </div>
          </div>

          <Button
            variant="contained"
            color="warning"
            className="w-full mt-6 font-semibold !bg-[#843E71]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Signup"}
          </Button>

          <div className="mt-5 text-sm text-black flex flex-col sm:flex-row items-center justify-center">
            <p className="mr-1">Already have an account?</p>
            <Link to="/login" className="text-[#FF8682] hover:underline font-medium">
              login
            </Link>
          </div>

          <p className="py-3 text-sm">------------------------ or login with -------------------------</p>
          <div className="flex w-full  justify-between  pt-2">
            <div className="w-[47%] border p-2 text-center rounded-md border-[#843E71]"><i class="fa-brands fa-facebook"></i></div>
            <div className="w-[47%] border p-2 text-center rounded-md border-[#843E71]"><i class="fa-brands fa-google"></i></div>
          </div>
        </form>
      </div>
    </div>
  );
}
