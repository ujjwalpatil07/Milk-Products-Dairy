import { Route, Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import Home from "../pages/Home"

import UserLogin from "../pages/Auth/User/UserLogin";
import UserSignUp from "../pages/Auth/User/UserSignUp";
import AdminLogin from "../pages/Auth/Admin/AdminLogin";
import Profile from "../pages/UserProfile/Profile";
import OtpVerification from "../pages/Auth/User/OtpVerification";
import ProfileInfoInput from "../pages/Auth/User/ProfileInfoInput";

export default function Routers() {
    return (
        <Routes>
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="/" element={<Profile/>} />

            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<Layout><UserSignUp /></Layout>} />
            <Route path="/signup/otp-verification" element={<OtpVerification/>} />
            <Route path="/signup/info-input" element={<ProfileInfoInput/>} />
            <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
    )
}