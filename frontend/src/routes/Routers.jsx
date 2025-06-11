import { Route, Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import HomePage from "../pages/HomePage"
import NotFound from "../components/NotFound"
import LandingPage from "../pages/LandingPage"
import AboutPage from "../pages/AboutPage"
import ProductPage from "../pages/ProductPage"

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/home" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/products/:productId?" element={<Layout><ProductPage /></Layout>} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}