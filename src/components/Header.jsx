import React, { useState } from "react";
// Material
import {
    Navbar,
    Button,
    Collapse,
} from "@material-tailwind/react";
// RRD
import { Link } from "react-router-dom";
// Context
import UserContext from "../context/UserContext";

let navListArray = [
    {
        text: "Home",
        link: "/"
    },
    {
        text: "Login",
        link: "/login"
    },
    {
        text: "Register",
        link: "/register"
    }
]

let navListArrayUser = [
    {
        text: "Home",
        link: "/"
    },
    {
        text: "Create Post",
        link: "/blog/add"
    }
]


const Header = () => {
    const { userInfo, setUserInfo } = React.useContext(UserContext);

    React.useEffect(() => {
        fetch("http://localhost:9000/api/v1/profile", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        }).then(response => {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
            })
        })
    }, []);
    const navList = (
        <ul className="flex items-center gap-5 xs:flex-col xs:items-start">
            {
                !userInfo?.username && navListArray.map((e, i) => (
                    <li key={i} className="text-black font-medium text-[15px] hover:text-blue-700">
                        <Link to={e.link}>{e.text}</Link>
                    </li>
                ))
            }
            {
                userInfo?.username && navListArrayUser.map((e, i) => (
                    <li key={i} className="text-black font-medium text-[15px] hover:text-blue-700">
                        <Link to={e.link}>{e.text}</Link>
                    </li>
                ))
            }
        </ul>
    );

    const [navToggle, setNavToggle] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 576 && setNavToggle(false),
        );
    }, []);

    const handleLogout = async () => {
        await fetch("http://localhost:9000/api/v1/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
        setUserInfo(null);
    }
    return (
        <header>
            <Navbar className="!px-0 !py-5 !rounded-none !border-none !max-w-full">
                <div className="container">
                    <div className="flex items-center gap-x-10">
                        <Link to="/" className="text-[20px] text-black font-bold leading-normal inline-block mr-auto">
                            Blogs App
                        </Link>
                        <div className="xs:hidden flex items-center gap-3">
                            {navList}
                            {userInfo?.username && (<Button onClick={handleLogout}>Logout</Button>)}
                        </div>
                        <Button onClick={() => setNavToggle(!navToggle)} ripple={false} className="sm:hidden">
                            MENU
                        </Button>
                    </div>
                    <Collapse open={navToggle}>
                        <div className="sm:hidden mt-5 xs:flex items-center gap-3">
                            {navList}
                            {userInfo?.username && (<Button onClick={handleLogout}>Logout</Button>)}
                        </div>
                    </Collapse>
                </div>
            </Navbar>
        </header>
    );
}

export default Header;