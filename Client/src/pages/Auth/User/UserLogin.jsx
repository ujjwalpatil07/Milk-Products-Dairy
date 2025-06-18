import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { ThemeContext } from "../../../context/ThemeProvider";
import { loginUser } from "../../../services/userService";
import { AdminAuthContext } from "../../../context/AuthProvider";

export default function UserLogin() {
  const navigate = useNavigate();
  const { handleAdminLogout } = useContext(AdminAuthContext);
  const { theme } = useContext(ThemeContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const { email, password } = formData;
      const data = await loginUser(email, password);

      if (data?.user) {
        localStorage.setItem("User", JSON.stringify(data.user));
        handleAdminLogout();
        toast.success("Login Successful!");
        navigate("/home");
      } else {
        toast.error("Login failed, please try again.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Server error or invalid credentials.");
    } finally {
      setIsLoading(false);
      setFormData({ email: "", password: "" });
    }
  };

  const getTextFieldStyles = (theme) => ({
    input: {
      color: theme === "dark" ? "#fff" : "#000",
      backgroundColor: "transparent",
    },
    "& label": {
      color: theme === "dark" ? "#bbb" : "#555",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme === "dark" ? "#888" : "#ccc",
      },
      "&:hover fieldset": {
        borderColor: "#843E71",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#843E71",
      },
    },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-8 bg-[#F0F1F3] dark:bg-[#121212] text-black dark:text-white transition-colors duration-300">
      <div className="bg-white dark:bg-gray-500/20 rounded-2xl shadow-xl px-6 py-10 w-full max-w-md">
        <form className="flex flex-col items-center w-full" onSubmit={handleFormSubmit}>
          <div className="flex flex-col items-center w-full px-3 gap-2 mb-6">
            <div className="flex justify-between bg-[#D595C3] dark:bg-[#843E71] w-full rounded-lg my-2 p-1">
              <button
                className="w-[48%] font-semibold p-1 text-center bg-white text-black dark:bg-gray-200 rounded-lg"
                type="button"
              >
                User
              </button>
              <button
                className="w-[48%] font-semibold p-1 text-center rounded-lg cursor-pointer hover:bg-white hover:text-black transition"
                onClick={() => navigate("/admin/login")}
                type="button"
              >
                Admin
              </button>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Login</h1>
          </div>

          <div className="w-full flex flex-col gap-5">
            <TextField
              id="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              required
              sx={getTextFieldStyles(theme)}
            />

            <div className="relative w-full">
              <TextField
                id="password"
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                required
                sx={getTextFieldStyles(theme)}
              />
              <button
                type="button"
                className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"} absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300`}
                onClick={() => setShowPassword(!showPassword)}
              ></button>
            </div>

            <div className="text-sm flex justify-between font-semibold text-right mb-3 text-[#FF8682]">
              <div className="flex justify-center text-black dark:text-gray-300 hover:underline">
                <input type="checkbox" className="me-2" /> Remember me
              </div>
              <Link to="/forget" className="hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button
            variant="contained"
            color="warning"
            className="w-full mt-6 font-semibold !bg-[#843E71] hover:!bg-[#6e2b5c]"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="mt-5 text-sm text-black dark:text-gray-300 flex flex-row items-center justify-center">
            <p className="mr-1">Don't have an account?</p>
            <Link to="/signup" className="text-[#FF8682] hover:underline font-medium">
              Sign up
            </Link>
          </div>

          <div className="flex items-center my-6 w-full">
            <div className="border-t border-gray-400 dark:border-gray-600 flex-grow mr-3" />
            <span className="text-gray-600 dark:text-gray-300 text-sm">or login with</span>
            <div className="border-t border-gray-400 dark:border-gray-600 flex-grow ml-3" />
          </div>

          <div className="flex w-full justify-between pt-2">
            <div className="w-[47%] border p-2 text-center rounded-md border-[#843E71] hover:bg-[#843E71] hover:text-white transition cursor-pointer">
              <i className="fa-brands fa-facebook"></i>
            </div>
            <div className="w-[47%] border p-2 text-center rounded-md border-[#843E71] hover:bg-[#843E71] hover:text-white transition cursor-pointer">
              <i className="fa-brands fa-google"></i>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
