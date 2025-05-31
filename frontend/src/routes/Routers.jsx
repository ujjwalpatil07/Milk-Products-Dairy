import { Route, Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import HomePage from "../pages/HomePage"
import NotFound from "../components/NotFound"
import LandingPage from "../pages/LandingPage"

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/home" element={<Layout><HomePage /></Layout>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}