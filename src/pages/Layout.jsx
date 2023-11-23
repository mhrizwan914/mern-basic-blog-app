// RRD
import { Outlet } from "react-router-dom";
// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout;