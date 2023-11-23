// RRD
import { Route, Routes } from "react-router-dom";
// Pages
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import BlogSingle from "../pages/blogs/Single";
import BlogEdit from "../pages/blogs/Edit";
import BlogAdd from "../pages/blogs/Add";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="single/:id" element={<BlogSingle />} />
                <Route path="edit/:id" element={<BlogEdit />} />
                <Route path="blog/add" element={<BlogAdd />} />
            </Route>
        </Routes>
    )
}

export default Router;