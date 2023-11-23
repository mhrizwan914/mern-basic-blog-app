import React from "react";
// Material
import { Button, Input } from "@material-tailwind/react";
// RRD
import { useNavigate } from "react-router-dom";
// Context
import UserContext from "../context/UserContext";

const Login = () => {
    const [userData, setUserData] = React.useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = React.useContext(UserContext);

    const handleUserData = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userData.username == "") {
            alert("Enter your Username")
        } else if (userData.password == "") {
            alert("Enter your Password")
        } else {
            let response = await fetch("http://localhost:9000/api/v1/login", {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            if (response.status !== 200) {
                alert("Credentails Incorrect");
            } else {
                alert("Successfully Loggedin");
                response.json().then(userInfo => {
                    setUserInfo(userInfo.data);
                })
                navigate("/");
            }
        }
    }
    return (
        <section>
            <div className="py-[50px]">
                <div className="container">
                    <div className="md:w-[80%] lg:w-[40%] m-auto shadow-lg p-5">
                        <h2 className="text-[30px] text-blue-gray-800 text-center font-bold leading-normal mb-5">
                            Login Here
                        </h2>
                        <form className="grid grid-cols-1 gap-5">
                            <Input
                                type="text"
                                name="username"
                                placeholder="Enter your Username"
                                className="!border-2 !border-blue-300 !py-0 !rounded-[5px]"
                                labelProps={{
                                    className: "!hidden"
                                }}
                                containerProps={{
                                    className: "h-[50px]"
                                }}
                                onChange={handleUserData}
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="!border-2 !border-blue-300 !py-0 !rounded-[5px]"
                                labelProps={{
                                    className: "!hidden"
                                }}
                                containerProps={{
                                    className: "h-[50px]"
                                }}
                                onChange={handleUserData}
                            />
                            <Button className="rounded-[5px] text-[18px]" onClick={handleSubmit}>Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;