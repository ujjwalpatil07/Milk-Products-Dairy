import { Route, Routes } from "react-router-dom"
import Layout from "../layouts/Layout"
import Home from "../pages/Home"

export default function Routers() {
    return (
        <Routes>
            <Route path="/home" element={<Layout><Home /></Layout>} />
            <Route path="*" element={<div>Hey we are here</div>} />
        </Routes>
    )
}