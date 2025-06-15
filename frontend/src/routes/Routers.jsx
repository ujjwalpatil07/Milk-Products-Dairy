import { Route, Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import HomePage from "../pages/HomePage"
import NotFound from "../components/NotFound"
import LandingPage from "../pages/LandingPage"
import AboutPage from "../pages/AboutPage"
import ProductPage from "../pages/ProductPage"
import ProductDetailsPage from "../pages/ProductDetailsPage"
import CartPage from "../pages/CartPage"
import ContactPage from "../pages/ContactPage"
import OrderCheckoutPage from "../pages/OrderCheckoutPage"

export default function Routers() {
    return (
        <Routes>
            <Route path="/" element={<Layout><LandingPage /></Layout>} />
            <Route path="/home" element={<Layout><HomePage /></Layout>} />
            <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            <Route path="/products/:productId?" element={<Layout><ProductPage /></Layout>} />
            <Route path="/product-details/:productId?" element={<Layout><ProductDetailsPage /></Layout>} />

            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/order-checkout" element={<Layout><OrderCheckoutPage /></Layout>} />

            <Route path="/contact-us" element={<Layout><ContactPage /></Layout>} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}